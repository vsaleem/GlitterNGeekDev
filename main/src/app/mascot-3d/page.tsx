"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeInfo } from "lucide-react";
import PageNav from "@/components/gng/PageNav";
import ThreeDogMascot, {
  type MascotControlPart,
  type MascotMotionRequest,
} from "@/components/gng/ThreeDogMascot";

const movableParts: { label: string; part: MascotControlPart }[] = [
  { label: "head", part: "head" },
  { label: "nose", part: "nose" },
  { label: "ears", part: "ears" },
  { label: "glasses", part: "glasses" },
  { label: "front legs", part: "front-legs" },
  { label: "back legs", part: "back-legs" },
  { label: "tail", part: "tail" },
];

export default function Mascot3DPage() {
  const [activePart, setActivePart] = useState<MascotControlPart | null>(null);
  const [motionRequest, setMotionRequest] = useState<MascotMotionRequest | null>(null);

  function movePart(part: MascotControlPart) {
    setActivePart(part);
    setMotionRequest({
      id: Date.now() + Math.random(),
      part,
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ff] text-slate-900">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(236,72,153,0.16),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(139,92,246,0.15),transparent_30%),linear-gradient(135deg,#fff_0%,#fff4fb_45%,#efe6ff_100%)]" />
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <PageNav />

          <div className="grid flex-1 items-center gap-8 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:py-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-purple-900">
                <BadgeInfo className="h-3.5 w-3.5 text-pink-500" />
                Interactive 3D option
              </div>
              <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-normal text-purple-950 sm:text-6xl">
                A soft 3D mascot built for gentle hover motion.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                This is a separate rendered option inspired by the current
                balloon-dog mascot. Hover over individual parts to see subtle,
                independent movement while preserving the same pink, glossy,
                soft-brand personality.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {movableParts.map(({ label, part }) => (
                  <button
                    key={part}
                    type="button"
                    aria-pressed={activePart === part}
                    onClick={() => movePart(part)}
                    className={`rounded-md border px-3 py-2 text-sm font-bold shadow-sm transition active:scale-95 ${
                      activePart === part
                        ? "border-purple-700 bg-purple-800 text-white shadow-purple-900/20"
                        : "border-purple-100 bg-white text-purple-950 hover:border-pink-300 hover:bg-pink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <Link
                href="/"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-purple-800 px-5 text-sm font-bold text-white transition hover:bg-purple-900"
              >
                Back to homepage <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative min-h-[500px] overflow-visible sm:min-h-[620px]">
              <div className="absolute inset-x-0 bottom-4 mx-auto h-24 w-[70%] rounded-full bg-purple-900/10 blur-3xl" />
              <ThreeDogMascot
                className="min-h-[500px] sm:min-h-[620px]"
                motionRequest={motionRequest}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
