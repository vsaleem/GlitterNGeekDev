import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock3 } from "lucide-react";
import { retrieveCheckoutSession } from "@/commerce/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order status | GlitterNGeek",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const session = sessionId
    ? await retrieveCheckoutSession(sessionId)
    : null;
  const paid =
    session?.payment_status === "paid" ||
    session?.payment_status === "no_payment_required";

  return (
    <main className="gng-shell grid min-h-screen place-items-center px-5 py-16">
      <div className="gng-panel w-full max-w-2xl p-7 text-center sm:p-10">
        {paid ? (
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        ) : (
          <Clock3 className="mx-auto h-12 w-12 text-purple-700" />
        )}
        <h1 className="mt-5 font-display text-4xl font-semibold text-[#25143a]">
          {paid ? "Your payment is confirmed." : "We’re confirming your payment."}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#655b70]">
          {paid
            ? "Thank you for your purchase. Your receipt will be sent to the verified email used at checkout. Toolkit access may take a moment to appear."
            : "Some payment methods take longer to confirm. Watch the email used at checkout for your receipt and next steps."}
        </p>
        <Link
          href={paid ? "/learn" : "/products"}
          className="gng-button-primary mt-7"
        >
          {paid ? "Open customer library" : "Return to GNG products"}
        </Link>
      </div>
    </main>
  );
}
