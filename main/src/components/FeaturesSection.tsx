"use client";
import { Card, CardContent } from "@/components/ui/card";

// Reusable feature card class helper
const featureCardClass = (extra?: string) =>
  [
    "group relative rounded-3xl shadow-md bg-white/90 backdrop-blur border border-white/50 transition-all duration-300 overflow-hidden hover:shadow-[0_12px_40px_-10px_rgba(140,60,190,0.35)] hover:-translate-y-1",
    extra,
  ]
    .filter(Boolean)
    .join(" ");

// Reusable overlay accent gradient (appears on hover via group-hover opacity)
const featureOverlayClass = (extra?: string) =>
  [
    "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-pink-200/40 via-fuchsia-200/30 to-purple-300/40",
    extra,
  ]
    .filter(Boolean)
    .join(" ");

// Reusable feature card content class helper
const featureCardContentClass = (extra?: string) =>
  [
    "p-10 text-center flex flex-col items-center justify-start",
    extra,
  ]
    .filter(Boolean)
    .join(" ");

export function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="mt-24 w-full flex flex-col items-center px-6">
      <h2 id="features-heading" className="sr-only">Core GlitterNGeek Learning Pillars</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card className={featureCardClass()}>
          <span className={featureOverlayClass()} />
          <CardContent className={featureCardContentClass()}>
            <h3 className="text-2xl font-bold text-purple-700 mb-6 tracking-tight">Tech Tutorials</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Beginner-friendly coding and AI guides that make learning fun and approachable.</p>
          </CardContent>
        </Card>
        <Card className={featureCardClass()}>
          <span className={featureOverlayClass()} />
          <CardContent className={featureCardContentClass()}>
            <h3 className="text-2xl font-bold text-purple-700 mb-6 tracking-tight">Soft Life Energy</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Gentle, aesthetic vibes to balance the challenges of coding with calm learning.</p>
          </CardContent>
        </Card>
        <Card className={featureCardClass()}>
          <span className={featureOverlayClass()} />
          <CardContent className={featureCardContentClass()}>
            <h3 className="text-2xl font-bold text-purple-700 mb-6 tracking-tight">Community</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Learn in public, grow together, and connect with fellow Geeks on the journey.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default FeaturesSection;
