import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import LearningThemeControls from "@/components/learning/LearningThemeControls";
import { getLearningAccess } from "@/learning/server";
import { requestMagicLink } from "./actions";

export const dynamic = "force-dynamic";

type SignInPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function LearningSignInPage({
  searchParams,
}: SignInPageProps) {
  const access = await getLearningAccess();
  if (access.status === "disabled") notFound();
  if (access.status === "authenticated") redirect("/learn");
  const { status } = await searchParams;
  const linkSent = status === "sent";

  return (
    <main className="learn-auth-page">
      <div className="learn-auth-toolbar">
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          GlitterNGeek.dev
        </Link>
        <LearningThemeControls />
      </div>
      <section className="learn-auth-panel">
        <Image
          src="/BrandLogo.svg"
          alt="GlitterNGeek"
          width={280}
          height={98}
          priority
        />
        <div className="learn-auth-icon" aria-hidden="true">
          <Mail />
        </div>
        <p className="learn-eyebrow">Customer access</p>
        <h1>{linkSent ? "Check your email." : "Sign in to your library."}</h1>
        <p>
          {linkSent
            ? "We sent a secure sign-in link. You can close this page after opening it."
            : "Use the email for your free signup or Toolkit purchase. No password is required."}
        </p>
        {!linkSent && (
          <form action={requestMagicLink} className="learn-fields">
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <button type="submit" className="learn-primary-button">
              <Mail aria-hidden="true" />
              Email me a sign-in link
            </button>
          </form>
        )}
        <div className="learn-auth-status">
          <ShieldCheck aria-hidden="true" />
          <span>
            {status === "invalid"
              ? "Enter a valid email address and try again."
              : status === "unavailable"
                ? "Sign-in is temporarily unavailable. Please try again later."
                : "Your link is single-use and your access is matched to your verified email."}
          </span>
        </div>
        <a href="mailto:support@glitterngeek.dev">Contact support</a>
      </section>
    </main>
  );
}
