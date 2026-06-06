"use client";

import { useEffect, useRef } from "react";

type Vec2 = {
  x: number;
  y: number;
};

type Edge = {
  from: number;
  to: number;
};

type Node = {
  id: number;
  clusterId: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  anchorX: number;
  anchorY: number;
  radius: number;
  blinkPhase: number;
  blinkSpeed: number;
  blinkAmplitude: number;
};

type Cluster = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftPhase: number;
  driftSpeed: number;
  driftRadiusX: number;
  driftRadiusY: number;
  edges: Edge[];
  nodeIds: number[];
};

type GraphTemplate = {
  type: "complete" | "constellation" | "star";
  anchors: Array<{ x: number; y: number }>;
  edges: Edge[];
};

const NODE_COLOR = "rgba(96, 165, 250, 0.78)";
const NODE_GLOW = "rgba(59, 130, 246, 0.18)";
const EDGE_COLOR = "rgba(94, 234, 212, 0.22)";
const EDGE_COLOR_STRONG = "rgba(125, 211, 252, 0.34)";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function distance(a: Vec2, b: Vec2) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function completeGraph(size: number, radiusX: number, radiusY: number): GraphTemplate {
  const anchors = Array.from({ length: size }, (_, index) => {
    const angle = (Math.PI * 2 * index) / size - Math.PI / 2;
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
    };
  });

  const edges: Edge[] = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      edges.push({ from: i, to: j });
    }
  }

  return { type: "complete", anchors, edges };
}

function constellationGraph(scale: number): GraphTemplate {
  const anchors = [
    { x: -70 * scale, y: -22 * scale },
    { x: -28 * scale, y: 34 * scale },
    { x: 8 * scale, y: -12 * scale },
    { x: 48 * scale, y: 42 * scale },
    { x: 82 * scale, y: -28 * scale },
  ];

  const edges = [
    { from: 0, to: 2 },
    { from: 2, to: 4 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 0, to: 1 },
  ];

  return { type: "constellation", anchors, edges };
}

function starGraph(nodeCount: number, radiusX: number, radiusY: number): GraphTemplate {
  const anchors = [{ x: 0, y: 0 }];

  for (let i = 0; i < nodeCount - 1; i += 1) {
    const angle = (Math.PI * 2 * i) / (nodeCount - 1) - Math.PI / 2;
    anchors.push({
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
    });
  }

  const edges = Array.from({ length: nodeCount - 1 }, (_, index) => ({
    from: 0,
    to: index + 1,
  }));

  return { type: "star", anchors, edges };
}

function getTemplates(): GraphTemplate[] {
  return [
    completeGraph(5, 72, 68),
    completeGraph(4, 82, 74),
    constellationGraph(1),
    constellationGraph(1.15),
    starGraph(4, 84, 76),
    starGraph(6, 92, 84),
  ];
}

function createScene(width: number, height: number) {
  const templates = getTemplates();
  const clusters: Cluster[] = [];
  const nodes: Node[] = [];
  let nodeId = 0;

  for (let i = 0; i < templates.length; i += 1) {
    const template = templates[i];
    const cluster: Cluster = {
      id: i,
      x: randomBetween(width * 0.12, width * 0.88),
      y: randomBetween(height * 0.16, height * 0.84),
      vx: randomBetween(-0.387072, 0.387072),
      vy: randomBetween(-0.290304, 0.290304),
      driftPhase: randomBetween(0, Math.PI * 2),
      driftSpeed: randomBetween(0.000290304, 0.000580608),
      driftRadiusX: randomBetween(0.056448, 0.129024),
      driftRadiusY: randomBetween(0.04032, 0.104832),
      edges: template.edges,
      nodeIds: [],
    };

    clusters.push(cluster);

    for (const anchor of template.anchors) {
      nodes.push({
        id: nodeId,
        clusterId: cluster.id,
        x: cluster.x + anchor.x,
        y: cluster.y + anchor.y,
        vx: randomBetween(-0.18, 0.18),
        vy: randomBetween(-0.18, 0.18),
        anchorX: anchor.x,
        anchorY: anchor.y,
        radius: randomBetween(2.4, 4.3),
        blinkPhase: randomBetween(0, Math.PI * 2),
        blinkSpeed: randomBetween(0.03, 0.068),
        blinkAmplitude: randomBetween(0.22, 0.52),
      });

      cluster.nodeIds.push(nodeId);
      nodeId += 1;
    }
  }

  return { clusters, nodes };
}

export default function BackgroundGraphField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let scene = createScene(window.innerWidth, window.innerHeight);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      scene = createScene(width, height);
    };

    const update = () => {
      const { clusters, nodes } = scene;

      for (const cluster of clusters) {
        cluster.driftPhase += cluster.driftSpeed;

        cluster.vx +=
          Math.cos(cluster.driftPhase + cluster.id) *
          cluster.driftRadiusX *
          0.0144;
        cluster.vy +=
          Math.sin(cluster.driftPhase * 1.12 + cluster.id) *
          cluster.driftRadiusY *
          0.0144;

        cluster.x += cluster.vx;
        cluster.y += cluster.vy;

        if (cluster.x < width * 0.1) {
          cluster.x = width * 0.1;
          cluster.vx = Math.abs(cluster.vx) * 0.24;
        } else if (cluster.x > width * 0.9) {
          cluster.x = width * 0.9;
          cluster.vx = -Math.abs(cluster.vx) * 0.24;
        }

        if (cluster.y < height * 0.14) {
          cluster.y = height * 0.14;
          cluster.vy = Math.abs(cluster.vy) * 0.24;
        } else if (cluster.y > height * 0.86) {
          cluster.y = height * 0.86;
          cluster.vy = -Math.abs(cluster.vy) * 0.24;
        }
      }

      for (let i = 0; i < clusters.length; i += 1) {
        for (let j = i + 1; j < clusters.length; j += 1) {
          const a = clusters[i];
          const b = clusters[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 188;

          if (dist < minDist) {
            const force = ((minDist - dist) / minDist) * 0.055;
            const nx = dx / dist;
            const ny = dy / dist;

            a.vx -= nx * force;
            a.vy -= ny * force;
            b.vx += nx * force;
            b.vy += ny * force;
          }
        }
      }

      for (const cluster of clusters) {
        cluster.vx = Math.max(-0.516096, Math.min(0.516096, cluster.vx * 0.99976));
        cluster.vy = Math.max(-0.387072, Math.min(0.387072, cluster.vy * 0.99976));
      }

      for (const node of nodes) {
        const cluster = clusters[node.clusterId];
        const targetX = cluster.x + node.anchorX;
        const targetY = cluster.y + node.anchorY;
        node.blinkPhase += node.blinkSpeed;

        node.vx += (targetX - node.x) * 0.0038;
        node.vy += (targetY - node.y) * 0.0038;
        node.vx *= 0.968;
        node.vy *= 0.968;
        node.x += node.vx;
        node.y += node.vy;
      }
    };

    const draw = () => {
      const { clusters, nodes } = scene;

      context.clearRect(0, 0, width, height);

      for (const cluster of clusters) {
        const clusterNodes = cluster.nodeIds.map((id) => nodes[id]).filter(Boolean);

        for (const edge of cluster.edges) {
          const a = clusterNodes[edge.from];
          const b = clusterNodes[edge.to];

          if (!a || !b) {
            continue;
          }

          const dist = distance(a, b);
          context.strokeStyle = dist < 96 ? EDGE_COLOR_STRONG : EDGE_COLOR;
          context.lineWidth = dist < 96 ? 1.35 : 0.9;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (const node of nodes) {
        const sparkleWave = (Math.sin(node.blinkPhase) + 1) / 2;
        const sparkle = Math.pow(sparkleWave, 3.2) * node.blinkAmplitude;
        const glowOpacity = 0.05 + sparkle * 0.18;
        const nodeOpacity = 0.46 + sparkle * 0.84;

        context.fillStyle = NODE_GLOW.replace(
          "0.18",
          `${Math.min(0.2, glowOpacity).toFixed(2)}`
        );
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 2.35, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = NODE_COLOR.replace(
          "0.78",
          `${Math.min(0.94, nodeOpacity).toFixed(2)}`
        );
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const tick = () => {
      if (!mediaQuery.matches) {
        update();
      }

      draw();
      animationFrame = window.requestAnimationFrame(tick);
    };

    resize();
    tick();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
    />
  );
}
