"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FloatingLogo() {
  const pathname = usePathname();
  if (pathname.startsWith("/learn")) return null;

  return (
    <a
      href="https://glitterngeek.dev"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GlitterNGeek website"
      className="fixed left-5 bottom-5 z-[9999] rounded-full ring-2 ring-pink-400 bg-white/90 backdrop-blur shadow-lg p-1 hover:scale-105 transition-transform"
    >
      <Image
        src="/RobotDogTrans.png"
        alt="GlitterNGeek Robot Dog logo"
        width={40}
        height={40}
        className="rounded-full"
        priority
      />
    </a>
  );
}
