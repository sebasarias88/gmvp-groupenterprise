"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

type ParallaxImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** How far (in %) the image travels while crossing the viewport. */
  strength?: number;
  /** Reveal the frame with a clip-path wipe when it enters the viewport. */
  reveal?: boolean;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
};

/**
 * Image inside a fixed frame that drifts vertically with scroll (parallax)
 * and optionally wipes into view.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  strength = 12,
  reveal = true,
  priority,
  sizes = "100vw",
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={reveal ? { clipPath: "inset(18% 12% 18% 12% round 32px)" } : undefined}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0% round 0px)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ y }} className="absolute inset-[-15%_0]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          placeholder="blur"
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}
