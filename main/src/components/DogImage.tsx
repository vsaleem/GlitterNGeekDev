"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

interface DogImageProps {
  width?: number;
  height?: number;
  float?: boolean; // enables gentle floating animation
  priority?: boolean;
  className?: string;
  withGlow?: boolean; // adds a soft colorful glow behind the dog
  alt?: string;
  mirrored?: boolean; // horizontally flip image
}

/**
 * DogImage – Reusable mascot image with optional glow + float animation.
 * Uses the pre-generated transparent WebP (smaller) asset. Width/height default to 500.
 */
export function DogImage({
  width = 500,
  height = 500,
  float = true,
  priority = false,
  className,
  withGlow = true,
  alt = "GlitterNGeek mascot dog wearing glasses",
  mirrored = false,
}: DogImageProps) {
  if (float) {
    return (
      <motion.div
        aria-label={alt}
        initial={{ y: 0 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={clsx(
          "relative inline-block",
          withGlow && [
            // Colored glow layer (slightly softer blur)
            "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-pink-300/50 before:via-fuchsia-300/40 before:to-purple-400/45 before:blur-3xl before:animate-pulse before:-z-10",
            // Softer, larger neutral shadow ellipse (lower opacity + bigger + more blur)
            "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[95%] after:h-[95%] after:rounded-full after:bg-gray-800/22 after:blur-[110px] after:-z-20"
          ],
          className
        )}
      >
        <Image
          src="/3dDogGlasses-transparent.webp"
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={clsx(
            "select-none drop-shadow-xl transition-transform",
            mirrored && "scale-x-[-1]"
          )}
        />
      </motion.div>
    );
  }

  return (
    <div
      aria-label={alt}
      className={clsx(
        "relative inline-block",
        withGlow && [
          // Colored glow layer (slightly softer blur)
          "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-pink-300/50 before:via-fuchsia-300/40 before:to-purple-400/45 before:blur-3xl before:animate-pulse before:-z-10",
          // Softer, larger neutral shadow ellipse (lower opacity + bigger + more blur)
          "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[95%] after:h-[95%] after:rounded-full after:bg-gray-800/22 after:blur-[110px] after:-z-20"
        ],
        className
      )}
    >
      <Image
        src="/3dDogGlasses-transparent.webp"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={clsx(
          "select-none drop-shadow-xl transition-transform",
          mirrored && "scale-x-[-1]"
        )}
      />
    </div>
  );
}

export default DogImage;
