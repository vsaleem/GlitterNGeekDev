import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import GngFooter from "@/components/gng/GngFooter";
import PageNav from "@/components/gng/PageNav";
import SoftMascot from "@/components/gng/SoftMascot";
import { smallBusinessAiToolkit as product } from "@/commerce/products";
import {
  getCheckoutReadiness,
  retrieveProductPriceDisplay,
} from "@/commerce/stripe";
import { flags } from "@/config/flags";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Small Business AI Toolkit | GlitterNGeek",
  description: product.shortDescription,
};

export default async function SmallBusinessAiToolkitPage() {
  const checkout = getCheckoutReadiness();
  const priceDisplay = checkout.enabled
    ? await retrieveProductPriceDisplay(product.slug)
    : null;

  return (
    <main className="gng-shell min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
        <PageNav isCoursesPageReleased={flags.coursesPageReleaseProd} />

        <section className="grid gap-12 py-12 lg:grid-cols-[1.05fr_0.78fr] lg:py-20">
          <div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-violet-800 hover:text-pink-600">
              <ArrowLeft className="h-4 w-4" /> All products
            </Link>
            <div className="gng-kicker mt-8">
              <Sparkles className="h-3.5 w-3.5 text-pink-500" />
              Beginner-friendly · Human-reviewed
            </div>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-[#25143a] sm:text-6xl lg:text-7xl">
              Turn “I should use AI” into one useful next step.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#655b70]">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Plain-language", "Reusable templates", "Seven-day plan"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#e6ddeb] bg-[#fffdf9] px-3 py-2 text-xs font-bold text-[#4e4558]">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="gng-panel self-start overflow-hidden lg:sticky lg:top-6">
            <div className="glitch-grid relative min-h-[220px] bg-[#eadcff] p-6">
              <div className="max-w-[230px] rounded-2xl bg-[#fffdf9] p-4 shadow-xl">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-pink-600">
                  quick-start status
                </p>
                <p className="mt-2 text-sm font-bold text-[#25143a]">
                  One task selected. Guardrails ready.
                </p>
              </div>
              <div className="absolute -bottom-4 left-1/2 h-[190px] -translate-x-1/2">
                <SoftMascot className="h-full" priority />
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">
                Standalone digital Toolkit
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-[#25143a]">
                {priceDisplay ?? "$49.00"}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#655b70]">
                One intentional purchase. No subscription, renewal, or
                automatic follow-on charge.
              </p>

              {checkout.enabled ? (
                <form action="/api/checkout" method="post" className="mt-6">
                  <input type="hidden" name="product" value={product.slug} />
                  <button type="submit" className="gng-button-primary w-full">
                    Get the Toolkit <LockKeyhole className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <div className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-4">
                  <p className="font-bold text-[#25143a]">Checkout opens soon.</p>
                  <p className="mt-1 text-sm leading-6 text-[#655b70]">
                    Secure payment and delivery checks are being completed
                    before purchases open.
                  </p>
                </div>
              )}

              <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#655b70]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>
                  Stripe securely processes checkout. Eligible methods appear based on your device and location.
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section className="py-16">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-600">What’s inside</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#25143a] sm:text-5xl">
                A guided path, not a folder of mystery files.
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {product.includes.map((item, index) => (
                <li key={item} className="gng-panel flex gap-4 p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eadcff] font-mono text-xs font-bold text-violet-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-7 text-[#4e4558]">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-2">
          <div className="rounded-[1.5rem] bg-[#25143a] p-7 text-white sm:p-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-emerald-300">OUTPUT / USEFUL</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">What it helps you do</h2>
            <ul className="mt-6 space-y-4">
              {product.promises.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-[#e9deef]">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-7 sm:p-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.17em] text-amber-700">GUARDRAILS / ON</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-amber-950">
              Useful starts—not risky shortcuts
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-amber-950/80">
              {product.boundaries.map((item) => (
                <li key={item} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <GngFooter isCoursesPageReleased={flags.coursesPageReleaseProd} />
      </div>
    </main>
  );
}
