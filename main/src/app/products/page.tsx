import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import SoftMascot from "@/components/gng/SoftMascot";
import { products } from "@/commerce/products";
import { flags } from "@/config/flags";

export const metadata: Metadata = {
  title: "Products | GlitterNGeek",
  description:
    "Beginner-friendly digital tools for using AI with more clarity, structure, and human review.",
};

export default function ProductsPage() {
  return (
    <main className="gng-shell min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
        <PageNav isCoursesPageReleased={flags.coursesPageReleaseProd} />

        <section className="grid items-center gap-10 py-16 lg:grid-cols-[1fr_0.78fr] lg:py-24">
          <div>
            <div className="gng-kicker">
              <Sparkles className="h-3.5 w-3.5 text-pink-500" />
              Practical digital products
            </div>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.035em] text-[#25143a] sm:text-6xl lg:text-7xl">
              Less staring at the glitch. More knowing what to do next.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#655b70]">
              GNG products turn beginner-friendly lessons into reusable prompts,
              worksheets, and action plans—with safety and human review built in.
            </p>
          </div>

          <div
            data-testid="products-mascot-visual"
            className="glitch-grid relative min-h-[400px] overflow-hidden rounded-[2rem] border border-[#d9cbe3] bg-[#eadcff]"
          >
            <div className="absolute left-1/2 top-6 z-20 w-[calc(100%-3rem)] max-w-[280px] -translate-x-1/2 rounded-2xl bg-[#fffdf9] p-5 shadow-xl">
              <ClipboardCheck className="h-5 w-5 text-violet-700" />
              <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-pink-600">
                GNG check
              </p>
              <p className="mt-2 font-bold leading-6 text-[#25143a]">
                Useful first. Safe always. Clear enough to repeat.
              </p>
            </div>
            <div
              data-testid="products-mascot"
              className="absolute -bottom-5 left-1/2 z-10 h-[260px] -translate-x-1/2 sm:h-[275px]"
            >
              <SoftMascot className="h-full" priority />
            </div>
          </div>
        </section>

        <section aria-labelledby="products-heading" className="py-8 lg:py-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
                Start here
              </p>
              <h2 id="products-heading" className="mt-3 font-display text-4xl font-semibold text-[#25143a] sm:text-5xl">
                A standalone learning tool for a real task.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#655b70]">
              No subscription. No unexplained jargon. Just a practical path from
              “I should use AI” to a plan you can review and use.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            {products.map((product) => (
              <article key={product.slug} className="gng-panel grid overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">
                <div className="glitch-grid flex min-h-[380px] flex-col justify-between bg-[#25143a] p-7 text-white sm:p-10">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-pink-300">
                      toolkit_01 / small-business-ai
                    </p>
                    <h3 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                      {product.name}
                    </h3>
                    <p className="mt-5 max-w-xl leading-7 text-[#e9deef]">
                      {product.shortDescription}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 font-mono text-xs font-bold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    HUMAN REVIEW: ON
                  </div>
                </div>

                <div className="p-7 sm:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
                    Inside the Toolkit
                  </p>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {product.includes.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3 rounded-xl bg-[#f8f2fb] p-4 text-sm leading-6 text-[#4e4558]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/products/${product.slug}`} className="gng-button-primary mt-8">
                    Explore the Toolkit <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <GngFooter isCoursesPageReleased={flags.coursesPageReleaseProd} />
      </div>
    </main>
  );
}
