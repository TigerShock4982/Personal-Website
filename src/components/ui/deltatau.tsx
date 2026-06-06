"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface DeltaTauIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface DeltaTauIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const OUTLINE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  animate: {
    pathLength: [0.4, 1],
    opacity: [0.6, 1],
    transition: { duration: 0.45 },
  },
};

const GLYPH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  animate: {
    opacity: [0.7, 1],
    scale: [0.96, 1.03, 1],
    transition: { duration: 0.45 },
  },
};

const DeltaTauIcon = forwardRef<DeltaTauIconHandle, DeltaTauIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const outlineControls = useAnimation();
    const glyphControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          outlineControls.start("animate");
          glyphControls.start("animate");
        },
        stopAnimation: () => {
          outlineControls.start("normal");
          glyphControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          outlineControls.start("animate");
          glyphControls.start("animate");
        }
      },
      [glyphControls, onMouseEnter, outlineControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          outlineControls.start("normal");
          glyphControls.start("normal");
        }
      },
      [glyphControls, onMouseLeave, outlineControls]
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
          <motion.path
            animate={outlineControls}
            d="M12 3.75l8 4.5v7.5L12 20.25 4 15.75v-7.5z"
            initial="normal"
            variants={OUTLINE_VARIANTS}
          />
          <motion.text
            animate={glyphControls}
            fill="currentColor"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fontSize="5.5"
            fontWeight="700"
            initial="normal"
            textAnchor="middle"
            variants={GLYPH_VARIANTS}
            x="12"
            y="14.25"
          >
            {"\u0394\u03A4"}
          </motion.text>
        </svg>
      </div>
    );
  }
);

DeltaTauIcon.displayName = "DeltaTauIcon";

export { DeltaTauIcon };
