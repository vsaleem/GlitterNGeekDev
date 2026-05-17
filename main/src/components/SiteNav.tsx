"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile dropdown on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav
        aria-label="Main"
        className={`w-full transition-colors duration-300 backdrop-blur-md ${
          scrolled ? "bg-white/70 shadow-sm ring-1 ring-purple-200/40" : "bg-white/40"
        }`}
      >
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-center relative min-h-[70px]">
          {/* Desktop inline links (fade / scale in ≥840px; kept in DOM for animated breakpoint transition) */}
          <ul className="flex items-center gap-6 text-md font-medium tracking-wide absolute left-2 sm:left-4 lg:left-6 transition-all duration-500 ease-out opacity-0 -translate-y-1 scale-95 pointer-events-none min-[840px]:opacity-100 min-[840px]:translate-y-0 min-[840px]:scale-100 min-[840px]:pointer-events-auto">
            <li>
              <a
                href="/courses"
                className="text-purple-800 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-sm px-1 py-1"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-purple-800 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-sm px-1 py-1"
              >
                About
              </a>
            </li>
          </ul>
          {/* Mobile dropdown toggle (fade / scale out at ≥840px) */}
          <div className="flex absolute left-2 sm:left-4 lg:left-6 items-center transition-all duration-500 ease-out opacity-100 scale-100 min-[840px]:opacity-0 min-[840px]:scale-90 min-[840px]:pointer-events-none">
            <div className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
                onClick={() => setMobileOpen(o => !o)}
                className="relative flex items-center justify-center w-10 h-10 rounded-md text-purple-800 bg-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 transition-colors"
              >
                <span className="sr-only">Toggle navigation</span>
                {/* Hamburger lines */}
                <span
                  aria-hidden
                  className={`block absolute left-2 right-2 h-0.5 bg-purple-800 rounded transition-all duration-400 ease-out ${mobileOpen ? 'top-1/2 rotate-45' : 'top-[30%]'} `}
                />
                <span
                  aria-hidden
                  className={`block absolute left-2 right-2 h-0.5 bg-purple-800 rounded transition-all duration-300 ease-out ${mobileOpen ? 'opacity-0 scale-x-0 top-1/2' : 'opacity-100 scale-x-100 top-1/2'} `}
                />
                <span
                  aria-hidden
                  className={`block absolute left-2 right-2 h-0.5 bg-purple-800 rounded transition-all duration-400 ease-out ${mobileOpen ? 'top-1/2 -rotate-45' : 'bottom-[30%]'} `}
                />
              </button>
              <div
                id="mobile-nav-menu"
                className={`absolute left-0 mt-2 w-40 rounded-lg border border-pink-200/60 bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 origin-top ${mobileOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                role="menu"
                aria-label="Primary navigation"
              >
                <ul className="py-2">
                  <li>
                    <a
                      href="/courses"
                      role="menuitem"
                      className="block px-4 py-2.5 text-purple-800 hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      role="menuitem"
                      className="block px-4 py-2.5 text-purple-800 hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Center brand logo (always visible) */}
          <Link href="/" aria-label="GlitterNGeek home" className="flex items-center justify-center group">
            <Image
              src="/BrandLogo.svg"
              alt="GlitterNGeek brand logo"
              width={180}
              height={180}
              priority
              className="h-40 w-auto md:h-40 lg:h-40 -mt-5 -mb-7 drop-shadow-md transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default SiteNav;
