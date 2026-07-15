import Image from "next/image";
import Link from "next/link";
import { isPortfolioPageReleased } from "@/config/flags";
import { navLinks } from "./pageData";

type PageNavProps = {
  variant?: "light" | "dark" | "simple";
   isCoursesPageReleased?: boolean; 
};

export function PageNav({ variant = "light", isCoursesPageReleased }: PageNavProps) {
  const isDark = variant === "dark";
  const portfolioIsReleased = isPortfolioPageReleased();

  const filteredNavLinks = navLinks.filter(
    (link) =>
      (isCoursesPageReleased || link.href !== "/courses") &&
      (portfolioIsReleased || link.href !== "/portfolio"),
  );

  return (
    <nav
      aria-label="Main"
      className={`flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        variant === "simple" ? "border-b border-[#e6ddeb] pb-6" : ""
      }`}
    >
      <Link
        href="/"
        aria-label="GlitterNGeek home"
        className="group flex shrink-0 items-center gap-2 self-start"
      >
        <Image
          src="/BrandLogo.svg"
          alt="GlitterNGeek"
          width={220}
          height={220}
          className="-my-2 h-16 w-auto transition-transform duration-200 group-hover:-rotate-1 sm:h-20"
          priority
        />
        <span
          className={`hidden text-[10px] font-bold uppercase tracking-[0.22em] lg:inline ${
            isDark ? "text-pink-100/80" : "text-[#655b70]"
          }`}
        >
          Academy
        </span>
      </Link>
      <div
        className={`flex w-full min-w-0 max-w-full items-center gap-0.5 overflow-x-auto rounded-full border p-1 text-xs font-bold sm:w-auto sm:gap-1 sm:text-sm ${
          isDark
            ? "border-white/15 bg-white/8 text-pink-50"
            : "border-[#e6ddeb] bg-[#fffdf9]/90 text-[#25143a] shadow-[0_14px_30px_-26px_rgba(37,20,58,.8)] backdrop-blur"
        }`}
      >
        {filteredNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-full px-2.5 py-2 transition sm:px-3 ${
              isDark
                ? "hover:bg-white/10 hover:text-white"
                : "hover:bg-[#eadcff] hover:text-[#4c1d95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default PageNav;
