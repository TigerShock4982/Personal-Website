import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MyAnimeListIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MyAnimeListIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BOX_VARIANTS: Variants = {
  normal: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.2 },
  },
  animate: {
    scale: [1, 1.06, 1],
    y: [0, -0.5, 0],
    opacity: [0.75, 1],
    transition: { duration: 0.45 },
  },
};

const MyAnimeListIcon = forwardRef<MyAnimeListIconHandle, MyAnimeListIconProps>(
  ({ className, size = 28, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          controls.start("animate");
        },
        stopAnimation: () => {
          controls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
          return;
        }

        controls.start("animate");
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
          return;
        }

        controls.start("normal");
      },
      [controls, onMouseLeave]
    );

    return (
      <motion.div
        animate={controls}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-current/45 bg-transparent font-mono font-semibold text-current",
          className
        )}
        initial="normal"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: size,
          height: size,
          fontSize: Math.max(9, Math.round(size * 0.34)),
          lineHeight: 1,
        }}
        variants={BOX_VARIANTS}
        {...props}
      >
        MAL
      </motion.div>
    );
  }
);

MyAnimeListIcon.displayName = "MyAnimeListIcon";

export { MyAnimeListIcon };
