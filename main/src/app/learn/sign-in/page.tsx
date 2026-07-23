import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import LearningThemeControls from "@/components/learning/LearningThemeControls";
import { getLearningAccess } from "@/learning/server";

export const dynamic = "force-dynamic";

export default async function LearningSignInPage() {
  const access = await getLearningAccess();
  if (access.status === "disabled") notFound();
  if (access.status === "authenticated") redirect("/learn");

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
        <h1>Check your email to sign in.</h1>
        <p>
          Customer magic-link sign-in is being connected. Access will require
          the verified email used for the free signup or Toolkit purchase.
        </p>
        <div className="learn-auth-status">
          <ShieldCheck aria-hidden="true" />
          <span>
            The learning application is closed until identity and entitlement
            services are ready.
          </span>
        </div>
        <a href="mailto:support@glitterngeek.dev">Contact support</a>
      </section>
    </main>
  );
}
