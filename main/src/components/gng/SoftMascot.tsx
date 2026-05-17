"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";

type MascotPose = {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  duration: number;
};

type SoftMascotProps = {
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

const stillPose: MascotPose = {
  x: 0,
  y: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scale: 1,
  duration: 650,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function nextSoftPose(): MascotPose {
  return {
    x: randomBetween(-5, 5),
    y: randomBetween(-7, 2),
    rotateX: randomBetween(-2.5, 2.5),
    rotateY: randomBetween(-3.5, 3.5),
    rotateZ: randomBetween(-2.8, 2.8),
    scale: randomBetween(1.005, 1.022),
    duration: randomBetween(720, 1100),
  };
}

export function SoftMascot({
  alt = "GlitterNGeek mascot",
  className = "",
  imageClassName = "",
  priority = false,
  width = 520,
  height = 520,
}: SoftMascotProps) {
  const [pose, setPose] = useState<MascotPose>(stillPose);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function scheduleNextPose() {
    timeoutRef.current = window.setTimeout(() => {
      setPose(nextSoftPose());
      scheduleNextPose();
    }, randomBetween(760, 1250));
  }

  function startHoverMotion() {
    setIsHovered(true);
    if (reduceMotionRef.current) return;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setPose(nextSoftPose());
    scheduleNextPose();
  }

  function stopHoverMotion() {
    setIsHovered(false);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPose(stillPose);
  }

  const mascotStyle: CSSProperties = {
    transform: `perspective(900px) translate3d(${pose.x}px, ${pose.y}px, 0) rotateX(${pose.rotateX}deg) rotateY(${pose.rotateY}deg) rotateZ(${pose.rotateZ}deg) scale(${pose.scale})`,
    transitionDuration: `${pose.duration}ms`,
  };

  return (
    <span
      className={`group/mascot relative inline-block select-none ${className}`}
      onPointerEnter={startHoverMotion}
      onPointerLeave={stopHoverMotion}
      onFocus={startHoverMotion}
      onBlur={stopHoverMotion}
      tabIndex={0}
      aria-label={alt}
    >
      <span
        aria-hidden
        className={`absolute inset-[12%] rounded-full bg-pink-300/0 blur-3xl transition-opacity duration-700 ${
          isHovered ? "opacity-45" : "opacity-0"
        }`}
      />
      <span
        className="relative block h-full origin-[50%_82%] transition-transform ease-[cubic-bezier(.22,.9,.25,1)] motion-reduce:transform-none motion-reduce:transition-none"
        style={mascotStyle}
      >
        <Image
          src="/3dDogGlasses-transparent.png"
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`pointer-events-none h-full w-auto drop-shadow-[0_20px_42px_rgba(88,28,135,0.16)] transition-[filter] duration-700 ${
            isHovered
              ? "drop-shadow-[0_24px_50px_rgba(236,72,153,0.24)]"
              : ""
          } ${imageClassName}`}
        />
      </span>
      <span
        aria-hidden
        className={`pointer-events-none absolute left-[18%] top-[18%] h-3 w-3 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,.9)] transition-all duration-700 ${
          isHovered ? "translate-x-2 -translate-y-2 opacity-80" : "opacity-0"
        }`}
      />
    </span>
  );
}

export default SoftMascot;
