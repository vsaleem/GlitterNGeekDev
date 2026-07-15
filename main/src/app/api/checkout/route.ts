import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/commerce/products";
import {
  createCheckoutSession,
  getCheckoutReadiness,
} from "@/commerce/stripe";

export const runtime = "nodejs";

function getSiteUrl(request: NextRequest): string {
  const configured = process.env.GNG_SITE_URL;
  if (configured) return new URL(configured).origin;
  if (process.env.NODE_ENV === "production") {
    throw new Error("GNG_SITE_URL is required in production.");
  }
  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  const readiness = getCheckoutReadiness();
  if (!readiness.enabled) {
    return NextResponse.json(
      { error: "Checkout is not available yet." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const product = getProduct(String(formData.get("product") ?? ""));
  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  try {
    const session = await createCheckoutSession({
      productSlug: product.slug,
      siteUrl: getSiteUrl(request),
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Unable to create checkout session", {
      message: error instanceof Error ? error.message : "Unknown error",
      product: product.slug,
    });
    return NextResponse.json(
      { error: "Secure checkout is temporarily unavailable." },
      { status: 502 },
    );
  }
}

