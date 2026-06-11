import Link from "next/link";
import { ArrowRight, HeartHandshake, Play, Sparkles } from "lucide-react";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import SoftMascot from "@/components/gng/SoftMascot";
import { learningPillars, youtubeUrl } from "@/components/gng/pageData";
import { flags } from "@/config/flags";

const values = [
  {
    title: "Beginner respect",
    copy: "GNG treats early learning as real learning, with repetition, context, and calm explanations.",
  },
  {
    title: "Creative confidence",
    copy: "The goal is not just to follow tutorials. It is to feel capable enough to make your own things.",
  },
  {
    title: "Soft ambition",
    copy: "The brand balances gentle energy with professional standards, practical skills, and clear outcomes.",
  },
];

export default async function AboutPage() {
  const isCoursesPageReleased = await flags.coursesPageReleaseProd;

  return (
    <main className="min-h-screen bg-[#fbf7ff] text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <PageNav isCoursesPageReleased={isCoursesPageReleased} />

        <div className="mt-8 overflow-hidden rounded-lg border border-purple-100 bg-white shadow-sm">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
                  GlitterNGeek Academy
                </p>
                <h1 className="mt-2 text-3xl font-bold text-slate-950">
                  About GlitterNGeek
                </h1>
              </div>
              {isCoursesPageReleased && (
                <Link
                  href="/courses"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-purple-800 px-4 text-sm font-bold text-white transition hover:bg-purple-900"
                >
                  View courses <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="grid gap-5 py-8 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="grid gap-6 2xl:grid-cols-[1fr_240px] 2xl:items-center">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-500">
                      The mission
                    </p>
                    <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-purple-950 sm:text-5xl">
                      Making tech feel welcoming, useful, and possible.
                    </h2>
                    <p className="mt-4 max-w-xl leading-7 text-slate-600">
                      GlitterNGeek is a soft-tech learning brand for beginners,
                      creative builders, and curious people who want to learn
                      web development and AI without losing their personality in
                      the process.
                    </p>
                  </div>
                  <SoftMascot
                    className="mx-auto h-40 sm:h-56 2xl:h-60"
                    priority
                    width={300}
                    height={300}
                  />
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-lg bg-purple-900 p-5 text-white shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
                    YouTube
                  </p>
                  <p className="mt-3 text-3xl font-bold">
                    Free beginner lessons
                  </p>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-purple-900"
                  >
                    <Play className="h-4 w-4" /> Watch channel
                  </a>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Community tone
                  </p>
                  <HeartHandshake className="mt-4 h-8 w-8 text-pink-500" />
                  <p className="mt-4 leading-7 text-slate-600">
                    Gentle, encouraging, specific, and honest about the work it
                    takes to learn.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {learningPillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  <pillar.icon className="h-5 w-5 text-purple-800" />
                  <h3 className="mt-4 text-lg font-bold text-slate-950">
                    {pillar.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {pillar.copy}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Sparkles className="h-5 w-5 text-pink-500" />
                  <h3 className="mt-4 text-lg font-bold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.copy}
                  </p>
                </div>
              ))}
            </div>

              {isCoursesPageReleased && (
                <div className="mt-5 rounded-lg bg-purple-950 p-6 text-white sm:p-8">
                  <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
                        Next step
                      </p>
                      <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
                        Start with one lesson, then build momentum.
                      </h2>
                    </div>
                    <Link
                      href="/courses"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-pink-400 px-5 text-sm font-bold text-purple-950 transition hover:bg-pink-300"
                    >
                      Explore learning paths <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
          </div>
        </div>

        <GngFooter />
      </section>
    </main>
  );
}
