"use client";
import clsx from "clsx";

/**
 * LearningPromiseSection
 */
export function LearningPromiseSection() {
  return (
    <section
      aria-labelledby="learning-promise-heading"
      className={clsx(
            "relative w-[calc(100%+6rem)] -mx-12 sm:w-[calc(100%+8rem)] sm:-mx-16 xl:w-[calc(100%+10rem)] xl:-mx-20 mt-28",
  "overflow-hidden",
  // Frosty glass with soft pink tint
  "backdrop-blur-2xl bg-gradient-to-r from-pink-50/70 via-white/35 to-pink-100/65",
        // Frost edge + inner subtle glow
        "border border-white/60 ring-1 ring-white/30",
        // Cooler, softer shadow
        "shadow-[0_10px_42px_-12px_rgba(120,100,160,0.25),0_2px_8px_rgba(0,0,0,0.06)]"
      )}
    >
  <div className="px-8 md:px-16 lg:px-28 py-16 md:py-24 relative min-h-[340px] md:min-h-[500px]">
        {/* Frosty light accents */}
  <span className="pointer-events-none absolute -top-24 -left-20 w-80 h-80 bg-pink-100/60 blur-[90px] rounded-full" />
  <span className="pointer-events-none absolute bottom-[-80px] right-[-60px] w-96 h-96 bg-gradient-to-br from-pink-200/55 via-pink-300/40 to-purple-300/45 blur-[110px] rounded-full" />
  {/* Soft pink overlay for subtle warmth */}
  <span className="pointer-events-none absolute inset-0 bg-pink-100/20 mix-blend-screen" />
        {/* Thin top highlight bar */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <h2
          id="learning-promise-heading"
              className="text-3xl md:text-5xl font-semibold text-gray-900/90 leading-snug max-w-4xl drop-shadow-[0_1.5px_3px_rgba(255,255,255,0.6)] ml-6 md:ml-0"
        >
          Accessible, engaging tech education that makes coding and AI approachable.
        </h2>
        {/* Bottom centered caption near edge */}
        <p className="text-[12px] md:text-sm text-gray-800/80 tracking-wide text-center absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-5 w-full px-4">
          {`What students learn from GlitterNGeek's Tutorials`}
        </p>
      </div>
    </section>
  );
}

export default LearningPromiseSection;
