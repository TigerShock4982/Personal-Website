"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MailIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAP_VARIANTS: Variants = {
  normal: {
    rotateX: 0,
    transition: { duration: 0.25 },
  },
  animate: {
    rotateX: [0, -20, 0],
    transition: { duration: 0.45 },
  },
};

const BODY_VARIANTS: Variants = {
  normal: {
    scale: 1,
    transition: { duration: 0.25 },
  },
  animate: {
    scale: [1, 1.03, 1],
    transition: { duration: 0.45 },
  },
};

const LINE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.25 },
  },
  animate: {
    pathLength: [0.4, 1],
    opacity: [0.7, 1],
    transition: { duration: 0.45 },
  },
};

const MailIcon = forwardRef<MailIconHandle, MailIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const flapControls = useAnimation();
    const bodyControls = useAnimation();
    const lineControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          flapControls.start("animate");
          bodyControls.start("animate");
          lineControls.start("animate");
        },
        stopAnimation: () => {
          flapControls.start("normal");
          bodyControls.start("normal");
          lineControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          flapControls.start("animate");
          bodyControls.start("animate");
          lineControls.start("animate");
        }
      },
      [bodyControls, flapControls, lineControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          flapControls.start("normal");
          bodyControls.start("normal");
          lineControls.start("normal");
        }
      },
      [bodyControls, flapControls, lineControls, onMouseLeave]
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
          <motion.rect
            animate={bodyControls}
            height="14"
            initial="normal"
            rx="2.5"
            variants={BODY_VARIANTS}
            width="18"
            x="3"
            y="5"
          />
          <motion.path
            animate={flapControls}
            d="M4 7l8 6 8-6"
            initial="normal"
            variants={FLAP_VARIANTS}
          />
          <motion.path
            animate={lineControls}
            d="M4 17l5.5-5"
            initial="normal"
            variants={LINE_VARIANTS}
          />
          <motion.path
            animate={lineControls}
            d="M20 17l-5.5-5"
            initial="normal"
            variants={LINE_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

MailIcon.displayName = "MailIcon";

export { MailIcon };
