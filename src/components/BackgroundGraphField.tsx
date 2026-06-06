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
  collisionRadius: number;
  zoneX: number;
  zoneY: number;
  zoneVx: number;
  zoneVy: number;
  zoneRadiusX: number;
  zoneRadiusY: number;
  driftPhase: number;
  driftSpeed: number;
  driftRadiusX: number;
  driftRadiusY: number;
  edges: Edge[];
  nodeIds: number[];
};

type GraphTemplate = {
  type: "complete" | "constellation" | "bridge" | "star";
  anchors: Array<{ x: number; y: number }>;
  edges: Edge[];
};

const NODE_COLOR = "rgba(96, 165, 250, 0.78)";
const NODE_GLOW = "rgba(59, 130, 246, 0.18)";
const EDGE_COLOR = "rgba(94, 234, 212, 0.22)";
const EDGE_COLOR_STRONG = "rgba(125, 211, 252, 0.34)";
const MOVEMENT_SPEED = 1.2;

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

function bridgeGraph(): GraphTemplate {
  const anchors = [
    { x: -86, y: 32 },
    { x: -52, y: -38 },
    { x: -12, y: 8 },
    { x: 24, y: -48 },
    { x: 58, y: 26 },
    { x: 88, y: -16 },
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  return { type: "bridge", anchors, edges };
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
    bridgeGraph(),
    starGraph(4, 84, 76),
    starGraph(6, 92, 84),
  ];
}

function createScene(width: number, height: number) {
  const templates = getTemplates();
  const clusters: Cluster[] = [];
  const nodes: Node[] = [];
  const columns = Math.max(
    1,
    Math.min(templates.length, Math.round(Math.sqrt(templates.length * (width / height))))
  );
  const rows = Math.ceil(templates.length / columns);
  const fieldLeft = width * 0.1;
  const fieldTop = height * 0.14;
  const fieldWidth = width * 0.8;
  const fieldHeight = height * 0.72;
  const cellWidth = fieldWidth / columns;
  const cellHeight = fieldHeight / rows;
  const graphScale = Math.min(1.3, cellWidth / 190, cellHeight / 175) * 0.6;
  let nodeId = 0;

  for (let i = 0; i < templates.length; i += 1) {
    const template = templates[i];
    const column = i % columns;
    const row = Math.floor(i / columns);
    const rowItemCount = Math.min(columns, templates.length - row * columns);
    const rowOffset = ((columns - rowItemCount) * cellWidth) / 2;
    const scaledAnchors = template.anchors.map((anchor) => ({
      x: anchor.x * graphScale,
      y: anchor.y * graphScale,
    }));
    const x = fieldLeft + rowOffset + (column + 0.5) * cellWidth;
    const y = fieldTop + (row + 0.5) * cellHeight;
    const collisionRadius =
      Math.max(...scaledAnchors.map((anchor) => Math.hypot(anchor.x, anchor.y))) +
      18 * graphScale;
    const zoneRadiusX = Math.min(
      cellWidth * 0.16,
      Math.max(14, collisionRadius * 0.35)
    );
    const zoneRadiusY = Math.min(
      cellHeight * 0.16,
      Math.max(14, collisionRadius * 0.35)
    );
    const zoneAngle = randomBetween(0, Math.PI * 2);
    const zoneSpeed = randomBetween(0.14, 0.3);
    const cluster: Cluster = {
      id: i,
      x,
      y,
      vx: randomBetween(-0.387072, 0.387072) * MOVEMENT_SPEED,
      vy: randomBetween(-0.290304, 0.290304) * MOVEMENT_SPEED,
      collisionRadius,
      zoneX: x,
      zoneY: y,
      zoneVx: Math.cos(zoneAngle) * zoneSpeed,
      zoneVy: Math.sin(zoneAngle) * zoneSpeed,
      zoneRadiusX,
      zoneRadiusY,
      driftPhase: randomBetween(0, Math.PI * 2),
      driftSpeed:
        randomBetween(0.000290304, 0.000580608) * MOVEMENT_SPEED,
      driftRadiusX: randomBetween(0.056448, 0.129024),
      driftRadiusY: randomBetween(0.04032, 0.104832),
      edges: template.edges,
      nodeIds: [],
    };

    clusters.push(cluster);

    for (const anchor of scaledAnchors) {
      nodes.push({
        id: nodeId,
        clusterId: cluster.id,
        x: cluster.x + anchor.x,
        y: cluster.y + anchor.y,
        vx: randomBetween(-0.18, 0.18),
        vy: randomBetween(-0.18, 0.18),
        anchorX: anchor.x,
        anchorY: anchor.y,
        radius: randomBetween(2.4, 4.3) * 0.6,
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
      const previousZonePositions = clusters.map((cluster) => ({
        x: cluster.zoneX,
        y: cluster.zoneY,
      }));

      for (const cluster of clusters) {
        const zoneExtentX = cluster.collisionRadius + cluster.zoneRadiusX;
        const zoneExtentY = cluster.collisionRadius + cluster.zoneRadiusY;

        cluster.zoneX += cluster.zoneVx;
        cluster.zoneY += cluster.zoneVy;

        if (cluster.zoneX < zoneExtentX) {
          cluster.zoneX = zoneExtentX;
          cluster.zoneVx = Math.abs(cluster.zoneVx);
        } else if (cluster.zoneX > width - zoneExtentX) {
          cluster.zoneX = width - zoneExtentX;
          cluster.zoneVx = -Math.abs(cluster.zoneVx);
        }

        if (cluster.zoneY < zoneExtentY) {
          cluster.zoneY = zoneExtentY;
          cluster.zoneVy = Math.abs(cluster.zoneVy);
        } else if (cluster.zoneY > height - zoneExtentY) {
          cluster.zoneY = height - zoneExtentY;
          cluster.zoneVy = -Math.abs(cluster.zoneVy);
        }
      }

      for (let i = 0; i < clusters.length; i += 1) {
        for (let j = i + 1; j < clusters.length; j += 1) {
          const a = clusters[i];
          const b = clusters[j];
          let dx = b.zoneX - a.zoneX;
          let dy = b.zoneY - a.zoneY;
          let dist = Math.sqrt(dx * dx + dy * dy);
          const aExtent =
            a.collisionRadius + Math.max(a.zoneRadiusX, a.zoneRadiusY);
          const bExtent =
            b.collisionRadius + Math.max(b.zoneRadiusX, b.zoneRadiusY);
          const minDist = aExtent + bExtent + 12;

          if (dist < minDist) {
            if (dist < 0.001) {
              const angle = ((a.id + 1) * 2.39996) % (Math.PI * 2);
              dx = Math.cos(angle);
              dy = Math.sin(angle);
              dist = 1;
            }

            const nx = dx / dist;
            const ny = dy / dist;
            const correction = (minDist - dist) * 0.5;
            const relativeVelocity =
              (b.zoneVx - a.zoneVx) * nx + (b.zoneVy - a.zoneVy) * ny;

            a.zoneX -= nx * correction;
            a.zoneY -= ny * correction;
            b.zoneX += nx * correction;
            b.zoneY += ny * correction;

            if (relativeVelocity < 0) {
              a.zoneVx += nx * relativeVelocity;
              a.zoneVy += ny * relativeVelocity;
              b.zoneVx -= nx * relativeVelocity;
              b.zoneVy -= ny * relativeVelocity;
            }
          }
        }
      }

      for (const cluster of clusters) {
        const zoneExtentX = cluster.collisionRadius + cluster.zoneRadiusX;
        const zoneExtentY = cluster.collisionRadius + cluster.zoneRadiusY;
        const previousZone = previousZonePositions[cluster.id];

        cluster.zoneX = Math.max(
          zoneExtentX,
          Math.min(width - zoneExtentX, cluster.zoneX)
        );
        cluster.zoneY = Math.max(
          zoneExtentY,
          Math.min(height - zoneExtentY, cluster.zoneY)
        );
        cluster.x += cluster.zoneX - previousZone.x;
        cluster.y += cluster.zoneY - previousZone.y;
      }

      for (const cluster of clusters) {
        cluster.driftPhase += cluster.driftSpeed;

        cluster.vx +=
          Math.cos(cluster.driftPhase + cluster.id) *
          cluster.driftRadiusX *
          0.0144 *
          MOVEMENT_SPEED;
        cluster.vy +=
          Math.sin(cluster.driftPhase * 1.12 + cluster.id) *
          cluster.driftRadiusY *
          0.0144 *
          MOVEMENT_SPEED;

        cluster.x += cluster.vx;
        cluster.y += cluster.vy;

        const minX = cluster.zoneX - cluster.zoneRadiusX;
        const maxX = cluster.zoneX + cluster.zoneRadiusX;
        const minY = cluster.zoneY - cluster.zoneRadiusY;
        const maxY = cluster.zoneY + cluster.zoneRadiusY;

        if (cluster.x < minX) {
          cluster.x = minX;
          cluster.vx = Math.abs(cluster.vx) * 0.24;
        } else if (cluster.x > maxX) {
          cluster.x = maxX;
          cluster.vx = -Math.abs(cluster.vx) * 0.24;
        }

        if (cluster.y < minY) {
          cluster.y = minY;
          cluster.vy = Math.abs(cluster.vy) * 0.24;
        } else if (cluster.y > maxY) {
          cluster.y = maxY;
          cluster.vy = -Math.abs(cluster.vy) * 0.24;
        }
      }

      for (let i = 0; i < clusters.length; i += 1) {
        for (let j = i + 1; j < clusters.length; j += 1) {
          const a = clusters[i];
          const b = clusters[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.collisionRadius + b.collisionRadius;

          if (dist < minDist) {
            if (dist < 0.001) {
              const angle = ((a.id + 1) * 2.39996) % (Math.PI * 2);
              dx = Math.cos(angle);
              dy = Math.sin(angle);
              dist = 1;
            }

            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            const correction = overlap * 0.5;
            const force =
              (overlap / minDist) * 0.055 * MOVEMENT_SPEED;

            a.x -= nx * correction;
            a.y -= ny * correction;
            b.x += nx * correction;
            b.y += ny * correction;

            a.vx -= nx * force;
            a.vy -= ny * force;
            b.vx += nx * force;
            b.vy += ny * force;
          }
        }
      }

      for (const cluster of clusters) {
        cluster.x = Math.max(
          cluster.zoneX - cluster.zoneRadiusX,
          Math.min(cluster.zoneX + cluster.zoneRadiusX, cluster.x)
        );
        cluster.y = Math.max(
          cluster.zoneY - cluster.zoneRadiusY,
          Math.min(cluster.zoneY + cluster.zoneRadiusY, cluster.y)
        );
        cluster.vx = Math.max(
          -0.516096 * MOVEMENT_SPEED,
          Math.min(0.516096 * MOVEMENT_SPEED, cluster.vx * 0.99976)
        );
        cluster.vy = Math.max(
          -0.387072 * MOVEMENT_SPEED,
          Math.min(0.387072 * MOVEMENT_SPEED, cluster.vy * 0.99976)
        );
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
