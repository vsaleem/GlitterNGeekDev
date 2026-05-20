## GLITTERNGEEK.DEV
---

## ✨ What This Is
An evolving Next.js (App Router) site that powers the GlitterNGeek.Dev's learning academy hub: animated ambient gradient hero, mascot (floating doggo), feature pillars, newsletter capture, and an accessible, performance‑aware component system built with a soft aesthetic.

## 🧱 Tech Stack
- **Framework:** Next.js 15 (App Router) + Turbopack dev server
- **Language:** TypeScript (strict where it matters, ergonomic elsewhere)
- **Styling:** Tailwind CSS v4 with a custom plugin (encapsulates base fonts, animated scrollbar, blob cards, text glow utilities)
- **Animation:** Framer Motion (component orchestration) + pure CSS keyframes (blob morph, sheen, gradient drift, micro‑interactions)
- **Icons:** lucide-react (tree‑shaken ESM)
- **Fonts:** DynaPuff (display), Quicksand / Geist Sans (body), Geist Mono (mono)
- **Images:** Next/Image + optimized WebP mascot + subtle decorative assets

## 🎨 Design System Highlights
| Element | Approach | Why |
|--------|----------|-----|
| Background | Multi-layer CSS gradients + optional hue cycle | Zero layout shift, crisp at any resolution |
| Mascot | `DogImage` with glow + float | Personality + gentle motion (respects reduced motion) |
| Cards | Organic blob border-radius morph | Playful, living UI without heavy assets |
| Badge | Sheen + micro pop/shimmer | Delightful but restrained feedback |
| Scrollbar | Animated glitter track (reduced-motion safe) | Theming extends to chrome |
| Text Effects | Utility classes (`text-glow-pink`, `heading-pink-glow`) | Reusable, composable emphasis |

## ♿ Accessibility & UX Intent
- Respect `prefers-reduced-motion` (animations disabled or softened).
- Focus-visible states preserved with layered glows (no outline nuking).
- Landmark & ARIA labels on major sections (`FeaturesSection`, footer card, hero image alt text).
- High contrast on interactive elements; soft aesthetics never sacrifice legibility.

## 🚀 Development
Run locally:
```bash
npm install
npm run dev
```
Visit http://localhost:3000.

Useful script notes:
- `dev` uses Turbopack for fast iteration.
- `build` -> production bundle (`.next/` with tracing/analysis artifacts).
- `lint` → ESLint (Next.js config) across `src/`.

## 🧩 Key Components
| Component | Purpose | Notes |
|-----------|---------|-------|
| `GradientBackground` | Layered pastel gradient + optional hue drift & cotton candy texture | All CSS; no runtime canvas cost |
| `DogImage` | Floating/glowing mascot | WebP + motion-safe float cycle |
| `FeaturesSection` | Three “learning pillars” cards | DRY helpers for card + overlay classes |
| `FooterSection` | Newsletter CTA + coming-soon badge | Sheen animation + micro-interaction text pop |
| `LearningPromiseSection` | (Marketing promise block) | Reinforces mission messaging |
| `ui/button`, `ui/card` | Base primitives | Composable Tailwind + variants |

## 🔄 Animations Reference
| Name | Location | Behavior |
|------|----------|----------|
| `blobMorph` | Tailwind config keyframes | Slow organic radius morph (26s loop) |
| `badgeSheen` / `badgeSheenIdle` | Tailwind config & globals.css | Passive idle shimmer + active swipe on hover |
| `softPulsePlay` | Tailwind config | Gentle scaling for play icon |
| `csPop` / `csShimmer` | `globals.css` | Micro-interaction on “Coming Soon” text |
| `gngGradientDrift` / `gngHueCycle` | Inline `<style>` in `GradientBackground` | Low-frequency drift + optional hue rotation |

All animations are motion-safe gated where appropriate.

## 🧪 Performance & Approach
| Principle | Implementation |
|-----------|----------------|
| Reduce layout shift | Pure CSS gradients (no images for hero) |
| Limit bundle bloat | Tree-shaken ESM icons; minimal deps |
| Avoid unnecessary re-renders | Stateless presentational components where possible |
| Accessibility first | Motion queries + focus-visible styles retained |

## 🛠 Extending
Add a new glowing text style:
1. Edit `tailwind.config.ts` plugin section → `addUtilities`.
2. Define e.g. `.text-glow-lavender`.
3. Restart dev (or rely on JIT picking it up) and apply the class.

Add a fourth feature card:
```tsx
<Card className={featureCardClass()}>
	<span className={featureOverlayClass()} />
	<CardContent className={featureCardContentClass()}>
		<h3 className="text-2xl font-bold text-purple-700 mb-6 tracking-tight">AI Projects</h3>
		<p className="text-gray-600 text-lg leading-relaxed">Practical mini builds showing how models slot into modern apps.</p>
	</CardContent>
</Card>
```

## 🔐 Environment / Secrets
Currently no server-side secrets committed. If adding API routes or server actions, prefer environment variables (`process.env.MY_KEY`) and never commit them.

## 🗺 Roadmap Snapshot
- [ ] Launch initial blog / articles (MDX pipeline)
- [ ] Course landing pages (prerelease signups)
- [ ] Dark / vibrant theme toggle (switching gradient variant)
- [ ] Accessibility audit pass (axe + keyboard trap checks)
- [ ] Micro docs site for component utilities
- [ ] Light analytics (privacy-respecting)

## 🤝 Contributing
Lightweight for now:
1. Fork & branch (`feature/your-idea`)
2. Keep PRs focused (UI, copy, or infra — pick one)
3. Ensure lint passes: `npm run lint`
4. Describe the vibe impact (performance, accessibility, delight💕)

## 📦 Deployment
Optimized for Vercel (edge-ready, Next.js 15). A standard `vercel` deploy runs `npm install && npm run build`.

## 📝 License
Copyright © GlitterNGeek, LLC. All rights reserved. Unless explicitly stated, code examples are not open‑licensed for commercial reuse.

## 💌 Stay in the Loop
Subscribe via the in-site form or follow on YouTube for course launch updates (June 2026 target).

— Learn Tech. Live Soft. Repeat.
