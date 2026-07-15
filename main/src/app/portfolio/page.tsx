import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Download,
  FileText,
  GitBranch,
  HeartHandshake,
  Layers3,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import { isPortfolioPageReleased } from "@/config/flags";

const impactStats = [
  { value: "7M+", label: "users supported on VA.gov healthcare systems" },
  { value: "20-30%", label: "completion-rate lift from workflow improvements" },
  { value: "95%", label: "test coverage target on mission-critical releases" },
  { value: "6+", label: "years building accessible web applications" },
];

const accomplishments = [
  {
    icon: ShieldCheck,
    title: "Built for high-impact federal systems",
    copy: "Delivered React experiences across VA.gov benefits, secure messaging, and home-loan workflows where reliability, accessibility, and clarity matter.",
  },
  {
    icon: GitBranch,
    title: "Improved delivery without raising risk",
    copy: "Used CI/CD practices, automated testing, feature flags, and release-minded engineering to ship with more confidence in compliance-driven environments.",
  },
  {
    icon: HeartHandshake,
    title: "Kept the user at the center",
    copy: "Partnered with product, design, backend, and QA teammates to reduce friction in complex forms and make critical services easier to complete.",
  },
];

const featuredWork = [
  {
    eyebrow: "VA.gov Benefits Platform",
    title: "0 to 1 integrated benefits applications",
    copy: "Built responsive React workflows with backend API integration, conditional logic, and WCAG-aligned interfaces that improved form completion by 20-30%.",
    tags: ["React", "REST APIs", "Feature flags", "Accessibility"],
  },
  {
    eyebrow: "VA Secure Messaging",
    title: "Large-scale healthcare communication",
    copy: "Supported a 7M+ user platform with reusable components, production defect reduction, code reviews, and release quality practices.",
    tags: ["React", "Testing", "CI/CD", "Federal systems"],
  },
  {
    eyebrow: "GlitterNGeek",
    title: "Creator-led tech education brand",
    copy: "Designed and built a soft-tech learning presence with modern landing pages, interactive mascot experiments, course pages, and a recruiter-friendly portfolio direction.",
    tags: ["Next.js", "Design systems", "Three.js", "Brand strategy"],
  },
];

const strengths = [
  "Frontend architecture that scales across teams",
  "Accessible, responsive UI implementation",
  "React, TypeScript, Node.js, HTML, and CSS",
  "API integration across Node and Java-backed services",
  "Testing with Jest, Cypress, and React Testing Library",
  "Production debugging, release stability, and CI/CD",
];

const resumeLinks = [
  {
    href: "/resumes/victoria-saleem-full-stack-software-engineer.pdf",
    label: "Full Stack Resume",
    copy: "Best fit for full-stack, platform, and federal engineering roles.",
  },
  {
    href: "/resumes/victoria-saleem-senior-frontend-engineer.pdf",
    label: "Senior Frontend Resume",
    copy: "Best fit for React, UI architecture, accessibility, and product engineering roles.",
  },
];

export default function PortfolioPage() {
  if (!isPortfolioPageReleased()) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff3fb] text-slate-950">
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fff7fd_0%,#ffe0f4_44%,#f8c4ec_100%)]" />
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <PageNav />

          <div className="grid min-h-[740px] items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-purple-950">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                Portfolio for senior teams
              </div>
              <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-normal text-purple-950 sm:text-6xl lg:text-7xl">
                Victoria Saleem builds calm, scalable software for real people.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Senior frontend and full-stack engineer with federal systems
                experience, strong React architecture, accessibility judgment,
                and a practical eye for release quality.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/resumes/victoria-saleem-full-stack-software-engineer.pdf"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-pink-500 px-5 text-sm font-bold text-purple-950 shadow-sm transition hover:bg-pink-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Download resume
                </Link>
                <a
                  href="mailto:vic@glitterngeek.dev"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-purple-200 bg-white/75 px-5 text-sm font-bold text-purple-950 shadow-sm transition hover:bg-white"
                >
                  <Mail className="h-4 w-4" />
                  Start a conversation
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg border border-white/80 bg-white/70 p-4 shadow-[0_24px_70px_-34px_rgba(157,23,77,0.5)] backdrop-blur">
                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="overflow-hidden rounded-lg bg-pink-100">
                    <Image
                      src="/vic.jpg"
                      alt="Victoria Saleem"
                      width={520}
                      height={640}
                      className="h-full min-h-[360px] w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="grid gap-3">
                    {impactStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg border border-pink-100 bg-white p-4 shadow-sm"
                      >
                        <p className="font-display text-4xl font-semibold text-pink-600">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {accomplishments.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-pink-100 bg-white p-5 shadow-sm"
            >
              <item.icon className="h-6 w-6 text-pink-500" />
              <h2 className="mt-4 text-xl font-bold text-purple-950">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="sticky top-8 rounded-lg bg-purple-950 p-6 text-white shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
                <BriefcaseBusiness className="h-4 w-4" />
                Selected work
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
                Work that proves the range.
              </h2>
              <p className="mt-5 leading-7 text-pink-50/75">
                The strongest pattern across Victoria&apos;s work is the mix of
                product empathy and engineering discipline: clear interfaces,
                tested releases, and systems that serve people at scale.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {featuredWork.map((project) => (
              <article
                key={project.title}
                className="rounded-lg border border-pink-100 bg-white p-5 shadow-sm sm:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500">
                  {project.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-purple-950">
                  {project.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {project.copy}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-pink-100 bg-pink-50 px-3 py-1.5 text-xs font-bold text-purple-950"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-lg border border-pink-100 bg-white shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-pink-500 p-6 text-purple-950 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
              <Layers3 className="h-4 w-4" />
              Engineering strengths
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
              Useful for teams that need thoughtful senior execution.
            </h2>
            <p className="mt-5 leading-7 text-purple-950/80">
              Recruiters, project managers, and senior engineers should leave
              with a clear sense of the work: modern UI, careful collaboration,
              durable code, and practical delivery habits.
            </p>
          </div>
          <div className="grid gap-3 p-6 sm:p-8 lg:p-10">
            {strengths.map((strength) => (
              <div
                key={strength}
                className="flex items-start gap-3 rounded-lg border border-pink-100 bg-pink-50/70 p-4"
              >
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
                <p className="font-semibold leading-6 text-purple-950">
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="rounded-lg bg-[linear-gradient(135deg,#3b0764_0%,#7e22ce_52%,#ec4899_100%)] p-6 text-white shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-100">
                <FileText className="h-4 w-4" />
                Resume reference
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
                Pick the resume that matches the conversation.
              </h2>
              <p className="mt-5 leading-7 text-pink-50/78">
                The portfolio gives the story; the resumes give the details for
                role-specific review.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {resumeLinks.map((resume) => (
                <a
                  key={resume.href}
                  href={resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 bg-white/12 p-5 text-white backdrop-blur transition hover:bg-white/18"
                >
                  <Download className="h-5 w-5 text-pink-100" />
                  <h3 className="mt-4 text-xl font-bold">{resume.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-pink-50/75">
                    {resume.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-pink-100">
                    Open PDF <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <GngFooter />
      </section>
    </main>
  );
}
