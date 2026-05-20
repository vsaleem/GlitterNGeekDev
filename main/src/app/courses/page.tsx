import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, Sparkles } from "lucide-react";
import CtaPair from "@/components/gng/CtaPair";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import { courseTracks, learningPillars } from "@/components/gng/pageData";

const courseOutcomes = [
  "Build polished landing pages with HTML, CSS, JavaScript, and React.",
  "Use AI tools to plan, debug, and explain code without skipping the fundamentals.",
  "Turn small lessons into portfolio-ready projects and creator workflows.",
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#14051d] text-white">
      <section className="relative">
        <Image
          src="/glitterCircuits.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,5,29,0.97)_0%,rgba(20,5,29,0.9)_44%,rgba(80,21,95,0.74)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <PageNav variant="dark" />

          <div className="grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/25 bg-white/8 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-pink-100">
                <Bot className="h-3.5 w-3.5 text-pink-300" />
                Glitter Circuit Lab
              </div>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
                The cozy path into code and AI.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-pink-50/78">
                Learn modern web development and practical AI workflows through
                calm, beginner-friendly lessons that still feel ambitious.
              </p>
              <div className="mt-8">
                <CtaPair dark />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-white/12 bg-white/[0.07] p-5 backdrop-blur">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Image
                    src="/RobotDogTrans.png"
                    alt="Robot dog mascot"
                    width={220}
                    height={220}
                    className="mx-auto h-44 w-auto"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
                      Signature path
                    </p>
                    <h2 className="mt-3 text-3xl font-bold">
                      AI-assisted portfolio builder
                    </h2>
                    <p className="mt-3 leading-7 text-pink-50/75">
                      Learn frontend foundations while using AI as a thoughtful
                      coding companion, from first layout to finished project.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {courseTracks.map((track) => (
                  <div
                    key={track.title}
                    className="rounded-lg border border-white/12 bg-purple-950/40 p-5"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink-300">
                      {track.eyebrow}
                    </span>
                    <h3 className="mt-3 text-xl font-bold">{track.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-pink-50/70">
                      {track.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-white/12 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
              What you will learn
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
              Skills that make the internet feel buildable.
            </h2>
            <p className="mt-5 leading-7 text-pink-50/72">
              The courses are designed for people who want tech to feel useful,
              creative, and less intimidating.
            </p>
          </div>
          <div className="grid gap-3">
            {courseOutcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex gap-4 rounded-lg border border-white/12 bg-white/[0.06] p-5"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-pink-300" />
                <p className="leading-7 text-pink-50/78">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {learningPillars.map((pillar) => (
            <div
              key={pillar.label}
              className="rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur"
            >
              <pillar.icon className="h-5 w-5 text-pink-300" />
              <h3 className="mt-4 text-lg font-bold">{pillar.label}</h3>
              <p className="mt-2 text-sm leading-6 text-pink-50/70">
                {pillar.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-pink-400 p-6 text-purple-950 shadow-sm sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                <Sparkles className="h-4 w-4" />
                June 2026
              </div>
              <h2 className="font-display text-4xl font-semibold leading-tight">
                Digital products and guided courses are coming next.
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-purple-950 px-5 text-sm font-bold text-white transition hover:bg-purple-900"
            >
              Meet GNG <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <GngFooter variant="dark" />
      </section>
    </main>
  );
}
