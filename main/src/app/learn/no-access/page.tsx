import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import LearningHeader from "@/components/learning/LearningHeader";
import { requireLearningAccess } from "@/learning/server";

export const dynamic = "force-dynamic";

export default async function NoLearningAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const access = await requireLearningAccess();
  const { product } = await searchParams;
  const isToolkit = product === "toolkit";

  return (
    <>
      <LearningHeader email={access.email} />
      <main className="learn-no-access">
        <div className="learn-auth-icon" aria-hidden="true">
          <LockKeyhole />
        </div>
        <p className="learn-eyebrow">Access check</p>
        <h1>Whoops, you don&apos;t have access.</h1>
        <p>
          {isToolkit
            ? "This Toolkit workspace is available to customers whose verified sign-in email matches the purchaser email."
            : "This learning area is not included with the verified email currently signed in."}
        </p>
        <div>
          {isToolkit ? (
            <Link
              href="/products/small-business-ai-toolkit"
              className="learn-purchase-button"
            >
              Purchase Toolkit - $49
            </Link>
          ) : null}
          <Link href="/learn" className="learn-primary-button">
            <ArrowLeft aria-hidden="true" />
            My Learning
          </Link>
          <a
            href="mailto:support@glitterngeek.dev"
            className="learn-secondary-button"
          >
            Contact support
          </a>
        </div>
      </main>
    </>
  );
}
