"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface SpotifyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SpotifyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLE_VARIANTS: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.25 },
  },
  animate: {
    scale: [1, 1.05, 1],
    rotate: [0, -6, 6, 0],
    transition: { duration: 0.55 },
  },
};

const WAVE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.25 },
  },
  animate: {
    pathLength: [0.45, 1],
    opacity: [0.65, 1],
    transition: { duration: 0.55 },
  },
};

const SpotifyIcon = forwardRef<SpotifyIconHandle, SpotifyIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const circleControls = useAnimation();
    const waveControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          circleControls.start("animate");
          waveControls.start("animate");
        },
        stopAnimation: () => {
          circleControls.start("normal");
          waveControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          circleControls.start("animate");
          waveControls.start("animate");
        }
      },
      [circleControls, onMouseEnter, waveControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          circleControls.start("normal");
          waveControls.start("normal");
        }
      },
      [circleControls, onMouseLeave, waveControls]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            animate={circleControls}
            cx="12"
            cy="12"
            initial="normal"
            r="9"
            variants={CIRCLE_VARIANTS}
          />
          <motion.path
            animate={waveControls}
            d="M8 10.25c2.8-1 5.8-.85 8 .4"
            initial="normal"
            variants={WAVE_VARIANTS}
          />
          <motion.path
            animate={waveControls}
            d="M8.6 13c2.2-.7 4.45-.55 6.2.35"
            initial="normal"
            variants={WAVE_VARIANTS}
          />
          <motion.path
            animate={waveControls}
            d="M9.25 15.5c1.45-.4 2.9-.3 4.05.2"
            initial="normal"
            variants={WAVE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

SpotifyIcon.displayName = "SpotifyIcon";

export { SpotifyIcon };
