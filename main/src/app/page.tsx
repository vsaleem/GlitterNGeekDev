import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import CtaPair from "@/components/gng/CtaPair";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import SoftMascot from "@/components/gng/SoftMascot";
import {
  homepageHighlights,
  learningPillars,
  youtubeUrl,
} from "@/components/gng/pageData";
import { flags } from "@/config/flags";

export default async function HomePage() {
  const isCoursesPageReleased = await flags.coursesPageReleaseProd;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ff] text-slate-900">
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(236,72,153,0.16),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(139,92,246,0.14),transparent_30%),linear-gradient(135deg,#fff_0%,#fff4fb_46%,#efe6ff_100%)]" />
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <PageNav isCoursesPageReleased={flags.coursesPageReleaseProd} />

          <div className="grid min-h-[760px] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-purple-900">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                Soft life tech school
              </div>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-normal text-purple-950 sm:text-6xl lg:text-7xl">
                {isCoursesPageReleased ? "Learn tech with calm, clarity, and a little glitter." : "Coming soon."}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
                Beginner-friendly web development and AI lessons for creative
                builders who want structure, confidence, and community.
              </p>
              <div className="mt-8">
                <CtaPair isCoursesPageReleased={flags.coursesPageReleaseProd} />
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {learningPillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-lg border border-purple-100 bg-white/85 p-4 shadow-sm"
                  >
                    <pillar.icon className="mb-3 h-5 w-5 text-pink-500" />
                    <h2 className="text-sm font-bold text-purple-950">
                      {pillar.label}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {pillar.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-lg bg-[linear-gradient(145deg,#fff_0%,#ffe7f6_40%,#d8c3ff_100%)] p-4 shadow-[0_24px_70px_-36px_rgba(88,28,135,0.55)]">
              <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_80%_28%,rgba(236,72,153,0.20),transparent_30%)]" />
              <div className="relative rounded-lg border border-white/70 bg-white/50 p-4 backdrop-blur">
                <Image
                  src="/laptop.png"
                  alt="Laptop with code"
                  width={760}
                  height={560}
                  className="mx-auto h-auto w-full"
                  priority
                />
              </div>
              <div className="relative mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-purple-950 p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.18em] text-pink-200">
                    Next cohort
                  </p>
                  <p className="mt-2 text-2xl font-bold">Sept 2026</p>
                </div>
                <div className="rounded-lg border border-white/70 bg-white/70 p-4 text-purple-950">
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-700/70">
                    Focus
                  </p>
                  <p className="mt-2 text-2xl font-bold">AI + Web Dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg bg-purple-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
              GlitterNGeek on YouTube
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Free lessons that make coding feel approachable.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-pink-50/75">
              Watch beginner tutorials, AI walkthroughs, and soft-tech build
              sessions designed to help you keep going.
            </p>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-pink-400 px-5 text-sm font-bold text-purple-950 transition hover:bg-pink-300"
            >
              Visit the channel <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {homepageHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-purple-100 bg-white p-5 shadow-sm"
              >
                <item.icon className="h-5 w-5 text-pink-500" />
                <h3 className="mt-4 text-lg font-bold text-purple-950">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-lg border border-purple-100 bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500">
              Digital products
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-purple-950 sm:text-5xl">
              Templates, guides, and beginner-friendly resources are coming.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-600">
              The next phase of GNG will turn lessons into practical resources
              you can reuse while building websites, planning content, and
              learning AI-assisted workflows.
            </p>
            {isCoursesPageReleased && (
              <Link
                href="/courses"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-purple-800 px-5 text-sm font-bold text-white transition hover:bg-purple-900"
              >
                Explore courses <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="relative min-h-[360px] bg-[#f7e7ff]">
            <SoftMascot className="absolute bottom-0 left-1/2 h-[340px] -translate-x-1/2 sm:h-[420px]" />
          </div>
        </div>
        <GngFooter isCoursesPageReleased={flags.coursesPageReleaseProd} />
      </section>
    </main>
  );
}
