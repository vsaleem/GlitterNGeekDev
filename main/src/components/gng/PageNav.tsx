import Image from "next/image";
import Link from "next/link";
import { navLinks } from "./pageData";

type PageNavProps = {
  variant?: "light" | "dark" | "simple";
   isCoursesPageReleased?: boolean; 
};

export function PageNav({ variant = "light", isCoursesPageReleased }: PageNavProps) {
  const isDark = variant === "dark";

  const filteredNavLinks = navLinks.filter(
    (link) => isCoursesPageReleased || link.href !== "/courses"
  );

  return (
    <nav
      aria-label="Main"
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
        variant === "simple" ? "border-b border-slate-200 pb-6" : ""
      }`}
    >
      <Link
        href="/"
        aria-label="GlitterNGeek home"
        className="flex items-center gap-3"
      >
        <Image
          src="/BrandLogo.svg"
          alt="GlitterNGeek"
          width={220}
          height={220}
          className="-my-3 h-20 w-auto sm:h-24"
          priority
        />
        <span
          className={`hidden text-xs font-bold uppercase tracking-[0.24em] sm:inline ${
            isDark ? "text-pink-100/80" : "text-purple-950/60"
          }`}
        >
          Academy
        </span>
      </Link>
      <div
        className={`flex w-full flex-wrap items-center justify-center gap-1 rounded-lg border p-1 text-sm font-bold sm:w-auto sm:justify-start sm:gap-2 ${
          isDark
            ? "border-white/15 bg-white/8 text-pink-50"
            : "border-purple-100 bg-white/75 text-purple-950 shadow-sm"
        }`}
      >
        {filteredNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-2.5 py-2 transition sm:px-3 ${
              isDark
                ? "hover:bg-white/10 hover:text-white"
                : "hover:bg-purple-50 hover:text-purple-800"
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
