import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Code2,
  Lightbulb,
  Play,
  Sparkles,
} from "lucide-react";
import CtaPair from "@/components/gng/CtaPair";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import SoftMascot from "@/components/gng/SoftMascot";
import { learningPillars, youtubeUrl } from "@/components/gng/pageData";
import { flags } from "@/config/flags";

const learningLoop = [
  {
    step: "01",
    title: "Start with the glitch",
    copy: "Bring the confusing prompt, broken layout, or half-formed idea. No pretending you already know the jargon.",
  },
  {
    step: "02",
    title: "See what’s happening",
    copy: "We make the invisible parts visible with plain-language explanations, examples, and guided checks.",
  },
  {
    step: "03",
    title: "Fix it with guardrails",
    copy: "Try a practical next step while keeping privacy, accuracy, and human review in the loop.",
  },
  {
    step: "04",
    title: "Build something useful",
    copy: "Leave with a repeatable skill, not just a lucky answer that worked once.",
  },
] as const;

export default async function HomePage() {
  const isCoursesPageReleased = await flags.coursesPageReleaseProd;

  return (
    <main className="gng-shell min-h-screen overflow-hidden">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
          <PageNav isCoursesPageReleased={isCoursesPageReleased} />

          <div className="grid min-h-[720px] items-center gap-12 py-14 lg:grid-cols-[0.94fr_1.06fr] lg:py-20">
            <div>
              <div className="gng-kicker">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                Beginner-first tech learning
              </div>
              <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[0.94] tracking-[-0.035em] text-[#25143a] sm:text-6xl lg:text-[5.25rem]">
                Tech feels <span className="text-pink-500">glitchy</span> at
                first. We’ll help it <span className="text-violet-700">click.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#655b70] sm:text-xl">
                Beginner-friendly AI and web learning with practical steps,
                human review, and a very good dog beside you.
              </p>
              <div className="mt-8">
                <CtaPair isCoursesPageReleased={isCoursesPageReleased} />
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-[#655b70]">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Plain language
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Human-reviewed
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> Built to use
                </span>
              </div>
            </div>

            <div className="glitch-grid relative min-h-[570px] overflow-hidden rounded-[2rem] border border-[#d9cbe3] bg-[#eadcff] p-4 shadow-[0_36px_90px_-56px_rgba(37,20,58,.86)] sm:p-7">
              <div className="relative rounded-[1.4rem] border border-[#ded5e5] bg-[#fffdf9] shadow-[0_28px_60px_-42px_rgba(37,20,58,.75)]">
                <div className="flex items-center justify-between border-b border-[#e6ddeb] px-5 py-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#655b70]">
                    lesson_01 / prompt-debug
                  </span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-start gap-3 rounded-xl border border-pink-200 bg-pink-50 p-4">
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-pink-700">
                        The glitch
                      </p>
                      <p className="mt-1 font-bold text-[#25143a]">
                        “My AI answer is vague and not useful.”
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#25143a] p-5 font-mono text-sm leading-7 text-[#f4ebf8]">
                    <p><span className="text-pink-300">context</span>: “I own a neighborhood bakery.”</p>
                    <p><span className="text-violet-300">task</span>: “Draft a 3-post launch plan.”</p>
                    <p><span className="text-emerald-300">check</span>: “Flag claims I should verify.”</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="debug-pulse h-full origin-left rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-emerald-300" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 pr-24 sm:pr-36">
                    <Lightbulb className="h-5 w-5 shrink-0 text-emerald-700" />
                    <p className="text-sm font-bold text-emerald-950">
                      Clear context + a specific task + a review step.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-3 z-10 h-[210px] sm:-right-1 sm:h-[270px]">
                <SoftMascot className="h-full" priority />
              </div>
              <div className="absolute bottom-40 right-5 z-20 max-w-[170px] rounded-2xl rounded-br-sm bg-[#fffdf9] px-4 py-3 text-sm font-bold leading-5 text-[#25143a] shadow-lg sm:bottom-52 sm:right-8">
                A glitch is information. Let’s read it together.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
              The GNG learning loop
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-[#25143a] sm:text-5xl">
              Confusion isn’t failure. It’s where learning starts.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-[#655b70]">
              GlitterNGeek turns that first “wait, what?” into a repeatable way
              to investigate, practice, and build with confidence.
            </p>
          </div>

          <ol className="grid gap-4">
            {learningLoop.map((item, index) => (
              <li
                key={item.step}
                className={`gng-panel grid gap-4 p-6 sm:grid-cols-[4rem_1fr] sm:p-8 ${
                  index === 1 ? "sm:translate-x-5" : index === 2 ? "sm:-translate-x-3" : ""
                }`}
              >
                <span className="font-mono text-sm font-bold text-pink-600">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#25143a]">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#655b70]">{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
            Learning that sticks
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-[#25143a] sm:text-5xl">
            See it. Try it. Use it in real life.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {learningPillars.map((pillar, index) => (
            <article
              key={pillar.label}
              className={`gng-panel p-7 ${index === 1 ? "bg-[#eadcff]" : index === 2 ? "bg-[#fff1f7]" : ""}`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25143a] text-white">
                <pillar.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[#25143a]">{pillar.label}</h3>
              <p className="mt-3 leading-7 text-[#655b70]">{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#25143a] text-white lg:grid-cols-[1fr_0.86fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-300">
              Your practical starting point
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Put AI to work without handing over your judgment.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#e9deef]">
              The Small Business AI Toolkit gives you prompts, worksheets,
              safety checks, and a seven-day action plan built for useful starts.
            </p>
            <Link
              href="/products/small-business-ai-toolkit"
              className="gng-button-primary mt-8 bg-pink-400 text-[#25143a] hover:bg-pink-300"
            >
              Explore the Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="glitch-grid bg-[#eadcff] p-6 sm:p-8">
            <div className="h-full rounded-2xl border border-white/70 bg-[#fffdf9]/92 p-5 shadow-xl sm:p-6">
              <div className="flex items-center justify-between">
                <Code2 className="h-5 w-5 text-violet-700" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#655b70]">
                  toolkit / quick-start
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Business-task inventory",
                  "Prompt starters",
                  "Safety + quality checks",
                  "Seven-day action tracker",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm font-bold text-[#25143a]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#eadcff] font-mono text-xs text-violet-800">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-[#25143a] p-4 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                      Review mode / on
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      Fact-check, protect private data, then decide what ships.
                    </p>
                  </div>
                  <Check className="h-6 w-6 shrink-0 text-emerald-300" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[#655b70] sm:text-[10px]">
                <span className="rounded-lg bg-[#f8f2fb] px-2 py-3">Choose</span>
                <span className="rounded-lg bg-[#f8f2fb] px-2 py-3">Practice</span>
                <span className="rounded-lg bg-[#f8f2fb] px-2 py-3">Apply</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
        <div className="gng-panel flex flex-col items-start justify-between gap-7 p-7 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
              Free lessons on YouTube
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-[#25143a] sm:text-4xl">
              Learn with us before you buy anything.
            </h2>
          </div>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="gng-button-secondary shrink-0">
            <Play className="h-4 w-4" /> Watch free tutorials
          </a>
        </div>

        <GngFooter isCoursesPageReleased={isCoursesPageReleased} />
      </section>
    </main>
  );
}
