import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SubscribeSignup from "@/components/SubscribeSignup";
import { isPortfolioPageReleased } from "@/config/flags";
import { navLinks, youtubeUrl } from "./pageData";

type GngFooterProps = {
  variant?: "light" | "dark";
  isCoursesPageReleased?: boolean;
};

export function GngFooter({ variant = "light", isCoursesPageReleased }: GngFooterProps) {
  const isDark = variant === "dark";
  const portfolioIsReleased = isPortfolioPageReleased();
  const filteredNavLinks = navLinks.filter(
    (link) =>
      (isCoursesPageReleased || link.href !== "/courses") &&
      (portfolioIsReleased || link.href !== "/portfolio"),
  );

  return (
    <footer
      className={`mt-20 overflow-hidden rounded-[1.75rem] ${
        isDark
          ? "border border-white/12 bg-white/[0.06] text-white"
          : "border border-[#e6ddeb] bg-[#25143a] text-white shadow-[0_30px_70px_-50px_rgba(37,20,58,.9)]"
      }`}
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div>
          <Image
            src="/BrandLogo.svg"
            alt="GlitterNGeek"
            width={260}
            height={260}
            className="-ml-4 -my-5 h-28 w-auto sm:h-32"
          />
          <p
            className={`mt-5 max-w-xl text-base leading-7 ${
              isDark ? "text-pink-50/72" : "text-[#e9deef]"
            }`}
          >
            Beginner-friendly web development and AI education for creative
            builders who want to learn with clarity, confidence, and softness.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            {filteredNavLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`rounded-md px-3 py-2 transition ${
                  isDark
                    ? "bg-white/8 text-pink-50 hover:bg-white/12"
                    : "bg-white/8 text-[#f8eefb] hover:bg-white/14"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 transition ${
                isDark
                  ? "bg-pink-400 text-purple-950 hover:bg-pink-300"
                  : "bg-pink-400 text-[#25143a] hover:bg-pink-300"
              }`}
            >
              YouTube <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div
          className={`rounded-lg p-5 ${
            isDark
              ? "border border-white/12 bg-purple-950/45"
              : "border border-white/12 bg-white/[0.07]"
          }`}
        >
          <SubscribeSignup unstyled />
        </div>
      </div>
    </footer>
  );
}

export default GngFooter;
