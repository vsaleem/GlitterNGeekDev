"use client";
import Image from "next/image";

export default function FloatingLogo() {
  return (
    <a
      href="https://glitterngeek.dev"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GlitterNGeek website"
      className="fixed left-5 bottom-5 z-[9999] rounded-full ring-2 ring-pink-400 bg-white/90 backdrop-blur shadow-lg p-1 hover:scale-105 transition-transform"
    >
      <Image
        src="/DogLogo.png"
        alt="GlitterNGeek logo"
        width={44}
        height={44}
        className="rounded-full"
        priority
      />
    </a>
  );
}
