import Image from "next/image";
import Link from "next/link";
import { navLinks } from "./pageData";

type SideNavProps = {
  activeHref?: string;
  brandFeel?: string;
  className?: string;
};

export function SideNav({
  activeHref = "/",
  brandFeel = "Professional, creator-led, still soft.",
  className = "",
}: SideNavProps) {
  return (
    <aside className={`bg-slate-950 p-6 text-white ${className}`}>
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
          className="-my-3 h-20 w-auto"
          priority
        />
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-pink-100/80">
          Academy
        </span>
      </Link>

      <nav
        aria-label="Section navigation"
        className="mt-12 space-y-2 text-sm font-semibold text-slate-300"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-white ${
              link.href === activeHref ? "bg-white/12 text-white" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-12 rounded-lg bg-pink-400 p-4 text-purple-950">
        <p className="text-xs font-bold uppercase tracking-[0.18em]">
          Brand feel
        </p>
        <p className="mt-2 text-xl font-bold">{brandFeel}</p>
      </div>
    </aside>
  );
}

export default SideNav;
