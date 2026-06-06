"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface GoodreadsIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GoodreadsIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const COVER_VARIANTS: Variants = {
  normal: {
    scale: 1,
    x: 0,
    transition: { duration: 0.25 },
  },
  animate: {
    scale: [1, 1.04, 1],
    x: [0, -0.5, 0],
    transition: { duration: 0.45 },
  },
};

const PAGE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    x: 0,
    transition: { duration: 0.25 },
  },
  animate: {
    pathLength: [0.4, 1],
    opacity: [0.6, 1],
    x: [0, 1, 0],
    transition: { duration: 0.45 },
  },
};

const BOOKMARK_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: { duration: 0.25 },
  },
  animate: {
    y: [0, 1.5, 0],
    transition: { duration: 0.45 },
  },
};

const GoodreadsIcon = forwardRef<GoodreadsIconHandle, GoodreadsIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const coverControls = useAnimation();
    const pageControls = useAnimation();
    const bookmarkControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          coverControls.start("animate");
          pageControls.start("animate");
          bookmarkControls.start("animate");
        },
        stopAnimation: () => {
          coverControls.start("normal");
          pageControls.start("normal");
          bookmarkControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          coverControls.start("animate");
          pageControls.start("animate");
          bookmarkControls.start("animate");
        }
      },
      [bookmarkControls, coverControls, onMouseEnter, pageControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          coverControls.start("normal");
          pageControls.start("normal");
          bookmarkControls.start("normal");
        }
      },
      [bookmarkControls, coverControls, onMouseLeave, pageControls]
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
            animate={coverControls}
            d="M6 4.5h9a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H6z"
            initial="normal"
            variants={COVER_VARIANTS}
          />
          <motion.path
            animate={pageControls}
            d="M6 4.5A2.5 2.5 0 0 0 3.5 7V19A2.5 2.5 0 0 1 6 16.5h9.5"
            initial="normal"
            variants={PAGE_VARIANTS}
          />
          <motion.path
            animate={BOOKMARK_VARIANTS}
            d="M14 4.5v5l-2-1.4L10 9.5v-5"
            initial="normal"
            variants={BOOKMARK_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

GoodreadsIcon.displayName = "GoodreadsIcon";

export { GoodreadsIcon };
