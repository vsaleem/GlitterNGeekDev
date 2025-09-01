"use client";
import Image from "next/image";
import React from "react";

interface BackgroundImageProps {
  src: string;                 // path in public/ e.g. /background.jpg
  alt?: string;                // accessible alt text (decorative? keep generic "Background")
  overlayClassName?: string;   // optional tailwind classes for an overlay tint
  priority?: boolean;          // next/image priority loading (keep true for above-the-fold hero)
  sizes?: string;              // responsive sizes descriptor used by next/image
  quality?: number;            // quality hint (default 90 for crisper background)
  placeholder?: 'empty' | 'blur'; // allow enabling blur placeholder (off by default to avoid perceived softness)
  className?: string;          // extra classes for the wrapping div
}

export function BackgroundImage({
  src,
  alt = "Background",
  overlayClassName,
  priority = true,
  sizes = "100vw",
  quality = 90,
  placeholder = 'empty',
  className = ''
}: BackgroundImageProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        // Avoid automatic blur placeholder unless explicitly requested; can make large images appear transiently soft
        placeholder={placeholder}
        className="object-cover object-center select-none" 
        // Ensure decoding does not block other critical resources
        decoding="async"
        // Explicit fetch priority (mirrors priority prop but future-proofs if priority removed)
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {overlayClassName ? <div className={`absolute inset-0 ${overlayClassName}`} /> : null}
    </div>
  );
}
