import type { Metadata } from "next";
import { ArrowUpRight, CalendarCheck, Clock3, ShieldCheck } from "lucide-react";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import { flags } from "@/config/flags";

const bookingUrl =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0PtKsrLFf8Yp6wsSQJYh0ktHHSVeBbb9WxJOfSdriX7qSPqa97TMFZ-SmRadFWYZiwU9Wi-d4O";

export const metadata: Metadata = {
  title: "Book a GNG Fit Call | GlitterNGeek",
  description:
    "Choose a live, conflict-checked time for a 20-minute conversation with GlitterNGeek.",
};

const callDetails = [
  {
    icon: Clock3,
    title: "20 focused minutes",
    copy: "Enough time to understand the problem, constraints, and best next step.",
  },
  {
    icon: CalendarCheck,
    title: "Live availability",
    copy: "Times update with the GNG calendar so unavailable slots stay unavailable.",
  },
  {
    icon: ShieldCheck,
    title: "Human-centered fit",
    copy: "We look for useful capacity gains without handing consequential decisions to AI.",
  },
] as const;

export default async function BookPage() {
  const isCoursesPageReleased = await flags.coursesPageReleaseProd;

  return (
    <main className="gng-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
        <PageNav isCoursesPageReleased={isCoursesPageReleased} />

        <div className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
              GNG 20-Minute Fit Call
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.025em] text-[#25143a] sm:text-6xl">
              Bring the frustrating work. Let&apos;s find the useful next step.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#655b70]">
              Choose a time to discuss an urgent AI workflow, React, TypeScript,
              deployment, accessibility, or frontend problem. The call is free;
              custom strategy and implementation begin with a paid engagement.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {callDetails.map((detail) => (
              <article key={detail.title} className="gng-panel p-5">
                <detail.icon className="h-5 w-5 text-violet-700" />
                <h2 className="mt-4 font-bold text-[#25143a]">{detail.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#655b70]">{detail.copy}</p>
              </article>
            ))}
          </div>

          <section
            aria-labelledby="choose-time"
            className="mt-8 overflow-hidden rounded-[1.5rem] border border-[#e6ddeb] bg-white shadow-[0_28px_70px_-52px_rgba(37,20,58,.72)]"
          >
            <div className="flex flex-col gap-3 border-b border-[#e6ddeb] bg-[#fffdf9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <h2 id="choose-time" className="text-xl font-bold text-[#25143a]">
                  Choose an available time
                </h2>
                <p className="mt-1 text-sm text-[#655b70]">
                  Times appear in your local timezone. A Google Meet link is added automatically.
                </p>
              </div>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gng-button-secondary shrink-0"
              >
                Open booking page <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <iframe
              src={bookingUrl}
              title="Book a GNG 20-Minute Fit Call"
              className="h-[760px] w-full border-0 bg-white"
              loading="eager"
            />
          </section>

          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-[#655b70]">
            Please do not submit passwords, customer data, financial records, or
            confidential source material through the booking form.
          </p>
        </div>

        <GngFooter isCoursesPageReleased={isCoursesPageReleased} />
      </section>
    </main>
  );
}
