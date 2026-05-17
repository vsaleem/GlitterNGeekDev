"use client";
import Image from "next/image";
import SubscribeSignup from "./SubscribeSignup";

const linkStyling = "transition-colors hover:text-pink-200 focus-visible:outline-none focus-visible:underline focus-visible:decoration-pink-200 focus-visible:underline-offset-4 rounded-sm";

export function FooterSection() {

  return (
  <footer className="relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 mt-32 text-white overflow-hidden overflow-x-hidden md:w-[calc(100%+4rem)] md:-mx-8 lg:w-[calc(100%+6rem)] lg:-mx-12 xl:w-[calc(100%+8rem)] xl:-mx-16">
      {/* Top gradient hairline divider */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute inset-0 -z-10">
        <Image src="/glitterCircuits.jpg" alt="Circuit background" fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/80 via-fuchsia-800/55 to-fuchsia-600/40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_58%,rgba(30,0,50,0.42))]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <section aria-labelledby="footer-videos-heading" className="max-w-4xl mx-auto text-center">
            <div className="relative mx-auto rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.45)] px-5 sm:px-8 py-8 sm:py-10 flex flex-col gap-5">
                <div className="space-y-4">
                    <h3 id="footer-videos-heading" className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight">
                        <span className="text-white">More YouTube Videos</span>
                    </h3>
                        <span className="badge-interact inline-block bg-black/85 text-white font-semibold tracking-wide text-sm sm:text-base px-3.5 py-1.5 rounded-md shadow-md -rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400">
                            <span className="coming-soon-text">Coming Soon</span>
                        </span>
                </div>
                <div className="mx-auto w-full max-w-xl">
                    <SubscribeSignup unstyled />
                </div>
            </div>
        </section>

        <div className="mt-14 md:mt-16 relative max-w-4xl mx-auto">
            <div aria-hidden="true" className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/8" />
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 text-sm text-center md:text-left px-6 py-8 sm:py-10">
                    <nav aria-labelledby="footer-learn-heading" className="mx-auto md:mx-0">
                        <h3 id="footer-learn-heading" className="font-semibold uppercase tracking-wider text-pink-100 mb-3 text-xs">Learn More</h3>
                        <ul className="space-y-2">
                        <li><a href="/about" className={linkStyling}>About</a></li>
                        <li><a href="/courses" className={linkStyling}>Courses</a></li>
                        </ul>
                    </nav>
                    <nav aria-labelledby="footer-follow-heading" className="mx-auto md:mx-0">
                        <h3 id="footer-follow-heading" className="font-semibold uppercase tracking-wider text-pink-100 mb-3 text-xs">Follow GlitterNGeek & Subscribe</h3>
                        <ul className="space-y-2">
                        <li><a href="https://instagram.com" className={linkStyling} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.youtube.com/channel/UCm3QJEpnGDirp-9bPkr02Vw" className={linkStyling} target="_blank" rel="noopener noreferrer">YouTube</a></li>
                        </ul>
                    </nav>
                    {/* Placeholder column for future navigation group */}
                    <div aria-hidden="true" />
                </div>
            </div>
            <div className="mt-16 md:mt-20 text-center text-[11px] text-pink-100/75 tracking-wide">
            © {new Date().getFullYear()} GlitterNGeek, LLC – All rights reserved.
            </div>
        </div>
    </footer>
  );
}

export default FooterSection;
