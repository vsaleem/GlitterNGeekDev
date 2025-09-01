"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { GradientBackground } from "@/components/GradientBackground";
import { DogImage } from "@/components/DogImage";
import { LearningPromiseSection } from "@/components/LearningPromiseSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FooterSection } from "@/components/FooterSection";
import { SiteNav } from "@/components/SiteNav";
import { DynaPuff } from "next/font/google";

// Expose DynaPuff as a CSS variable so base heading styles (var(--font-display)) pick it up
const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-display",
});

export default function LandingPage() {
  return (
    <div
      className={`${dynaPuff.variable} relative min-h-screen flex flex-col items-center justify-start p-6 pt-28 md:pt-32`}
    >
      <SiteNav />
      <GradientBackground
        variant="light"
        brightness={1.05}
        saturation={1.05}
        animate
        motionStrength={1.4}
        tintShift
        tintRange={22}
        tintDuration={60}
        cottonIntensity={0.6}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mt-25 mb-30 md:mb-30 md:mt-25">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -3 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 0.9, 0.3, 1.04] }}
            className="will-change-transform origin-center drop-shadow-[0_10px_32px_rgba(139,92,246,0.25)]"
          >
            <Image
              src="/laptop.png"
              alt="Laptop illustration"
              width={400}
              height={400}
              priority
            />
          </motion.div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center leading-tight gap-2">
          <Sparkles className="w-8 h-8 text-pink-300" />
          <span
            className={`${dynaPuff.className} text-purple-900 heading-pink-glow sm:block`}
          >
            Learn Tech &
          </span>
          <span
            className={`${dynaPuff.className} text-white heading-pink-glow sm:block`}
          >
            Live Soft:
          </span>
        </h1>
        <h2 className="heading-pink-glow text-2xl sm:text-2xl md:text-3xl mt-4 mb-6 font-bold flex items-center justify-center gap-2 text-white">
          Web Development and AI Courses
        </h2>
        <p className="text-lg sm:text-lg md:text-xl text-gray-700 mb-20">
          A cozy space where tech, coding, and AI meet soft life vibes. Learn,
          code, and grow with me ✨
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex gap-4"
      >
        <a
          href="https://www.youtube.com/channel/UCm3QJEpnGDirp-9bPkr02Vw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            variant="whiteOutline"
            className="rounded-2xl shadow-lg"
          >
            Subscribe on YouTube
          </Button>
        </a>
      </motion.div>
      {/* GlitterNGeek's YouTube Section */}
      <section className="mt-24 max-w-5xl w-full flex flex-col items-center text-center px-4">
        <div className="relative w-full max-w-5xl">
          <div
            className="fun-shape-card relative shadow-xl px-8 md:px-16 pb-16 md:pb-32 pt-40 overflow-visible animate-blobMorph"
            tabIndex={0}
            aria-label="Featured GlitterNGeek YouTube section"
          >
            {/* Flex layout for image + content (doggy overlaps top ~15%) */}
            <div className="flex flex-col md:flex-row items-center md:items-center md:gap-12 -mt-24 md:-mt-40">
              {/* Doggy Image column */}
              <div className="relative shrink-0">
                {/* Mobile size */}
                <div className="md:hidden">
                  <DogImage
                    width={240}
                    height={240}
                    float
                    withGlow
                    mirrored
                    priority
                  />
                </div>
                {/* Desktop size */}
                <div className="hidden md:block">
                  <DogImage
                    width={360}
                    height={360}
                    float
                    withGlow
                    mirrored
                    priority
                  />
                </div>
              </div>
              {/* Content column */}
              <div className="mt-8 md:mt-0 md:flex-1 md:text-left flex flex-col justify-center md:pr-10 lg:pr-12">
                <div className="w-full md:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px] md:pt-10 lg:pt-12">
                  <h2
                    className={`${dynaPuff.className} text-3xl md:text-4xl font-bold text-purple-900 md:mt-5 mb-6 text-glow-pink-soft`}
                  >
                    {`GlitterNGeek's YouTube`}
                  </h2>
                  <p className="text-gray-700 mb-8 md:mb-6">
                    Dive into a world of tech tutorials, soft life energy, and
                    community vibes — all through
                    <strong> Free Beginner Courses and Tutorials</strong>
                  </p>
                  <div className="flex justify-center md:justify-start mb-8">
                    <Image
                      src="/lights.jpg"
                      alt="Decorative circuit lights"
                      width={300}
                      height={75}
                      className="border-2 border-purple-600 rounded-md block"
                    />
                  </div>
                  <a
                    href="https://www.youtube.com/channel/UCm3QJEpnGDirp-9bPkr02Vw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      variant="whiteOutline"
                      className="yt-pill-btn rounded-2xl shadow-md transition-all duration-500 ease-out flex items-center gap-2"
                    >
                      <span className="w-7 h-7 flex items-center justify-center">
                        {/* Cute little play icon 💜*/}
                        <svg
                          viewBox="0 0 24 24"
                          className="soft-play-icon w-7 h-7 text-purple-600"
                          aria-hidden="true"
                        >
                          <path
                            d="M10.5 7.2c0-.9.9-1.5 1.7-1.05l6.8 4.05c.8.48.8 1.62 0 2.1l-6.8 4.05c-.8.48-1.7-.15-1.7-1.05V7.2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="md:whitespace-nowrap">
                        YouTube Channel
                      </span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LearningPromiseSection />
      <FeaturesSection />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-32 max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold text-purple-900 mb-4">
          Coming Soon: Digital Products
        </h2>
        <p className="text-gray-700 mb-6">
          Stay tuned for beginner-friendly guides and resources launching in
          January 2026.
        </p>
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-md"
        >
          Notify Me
        </Button>
      </motion.div>
      <FooterSection />
    </div>
  );
}
