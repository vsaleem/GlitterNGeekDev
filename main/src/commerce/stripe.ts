import { createHmac, timingSafeEqual } from "node:crypto";
import type { ProductSlug } from "./products";

const STRIPE_API_BASE = "https://api.stripe.com/v1";
const STRIPE_SIGNATURE_TOLERANCE_SECONDS = 300;

export type StripeCheckoutSession = {
  id: string;
  url?: string | null;
  payment_status?: "paid" | "unpaid" | "no_payment_required";
  customer_details?: { email?: string | null } | null;
  metadata?: Record<string, string> | null;
  client_reference_id?: string | null;
  payment_intent?: string | { id: string } | null;
  amount_total?: number | null;
  currency?: string | null;
};

export type StripeEvent = {
  id: string;
  type: string;
  data: { object: StripeCheckoutSession };
};

type StripePrice = {
  unit_amount?: number | null;
  currency?: string;
};

export type CheckoutReadiness = {
  enabled: boolean;
  missing: string[];
};

export function getCheckoutReadiness(): CheckoutReadiness {
  const missing: string[] = [];

  if (process.env.GNG_CHECKOUT_ENABLED !== "true") {
    missing.push("GNG_CHECKOUT_ENABLED=true");
  }
  if (process.env.GNG_LEARNING_APP_ENABLED !== "true") {
    missing.push("GNG_LEARNING_APP_ENABLED=true");
  }
  if (!process.env.GNG_SITE_URL) {
    missing.push("GNG_SITE_URL");
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    missing.push("STRIPE_SECRET_KEY");
  }
  if (!process.env.STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT) {
    missing.push("STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT");
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    missing.push("STRIPE_WEBHOOK_SECRET");
  }
  if (process.env.GNG_FULFILLMENT_MODE !== "entitlements") {
    missing.push("GNG_FULFILLMENT_MODE=entitlements");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }

  return { enabled: missing.length === 0, missing };
}

function requireStripeSecretKey(): string {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured.");
  }
  return secretKey;
}

function getPriceId(productSlug: ProductSlug): string {
  if (productSlug === "small-business-ai-toolkit") {
    const priceId = process.env.STRIPE_PRICE_SMALL_BUSINESS_AI_TOOLKIT;
    if (priceId) return priceId;
  }
  throw new Error("A Stripe price is not configured for this product.");
}

async function stripeRequest<T>(
  path: string,
  init: Omit<RequestInit, "headers"> & { headers?: HeadersInit } = {},
): Promise<T> {
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${requireStripeSecretKey()}`,
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const requestId = response.headers.get("request-id") ?? "unknown";
    console.error("Stripe request failed", {
      status: response.status,
      requestId,
      path,
    });
    throw new Error("The secure checkout service is temporarily unavailable.");
  }

  return (await response.json()) as T;
}

export async function createCheckoutSession(input: {
  productSlug: ProductSlug;
  siteUrl: string;
  userId: string;
  customerEmail: string;
}): Promise<StripeCheckoutSession> {
  const priceId = getPriceId(input.productSlug);
  const body = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${input.siteUrl}/products/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.siteUrl}/products/${input.productSlug}`,
    customer_creation: "always",
    customer_email: input.customerEmail,
    client_reference_id: input.userId,
    "metadata[product_slug]": input.productSlug,
    "metadata[price_id]": priceId,
    "metadata[supabase_user_id]": input.userId,
    "payment_intent_data[metadata][product_slug]": input.productSlug,
    "payment_intent_data[metadata][supabase_user_id]": input.userId,
  });

  if (process.env.STRIPE_AUTOMATIC_TAX === "true") {
    body.set("automatic_tax[enabled]", "true");
  }

  return stripeRequest<StripeCheckoutSession>("/checkout/sessions", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export async function retrieveCheckoutSession(
  sessionId: string,
): Promise<StripeCheckoutSession | null> {
  if (!/^cs_(test_)?[A-Za-z0-9]+$/.test(sessionId)) return null;

  try {
    return await stripeRequest<StripeCheckoutSession>(
      `/checkout/sessions/${encodeURIComponent(sessionId)}`,
    );
  } catch {
    return null;
  }
}

export async function retrieveProductPriceDisplay(
  productSlug: ProductSlug,
): Promise<string | null> {
  try {
    const price = await stripeRequest<StripePrice>(
      `/prices/${encodeURIComponent(getPriceId(productSlug))}`,
    );
    if (price.unit_amount == null || !price.currency) return null;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency.toUpperCase(),
    }).format(price.unit_amount / 100);
  } catch {
    return null;
  }
}

function parseStripeSignature(signatureHeader: string): {
  timestamp: number;
  signatures: string[];
} | null {
  let timestamp: number | undefined;
  const signatures: string[] = [];

  for (const part of signatureHeader.split(",")) {
    const [key, value] = part.split("=", 2);
    if (key === "t") timestamp = Number(value);
    if (key === "v1" && value) signatures.push(value);
  }

  if (!timestamp || !Number.isFinite(timestamp) || signatures.length === 0) {
    return null;
  }
  return { timestamp, signatures };
}

export function verifyAndParseStripeEvent(
  rawBody: string,
  signatureHeader: string,
): StripeEvent {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("Stripe webhook is not configured.");

  const parsed = parseStripeSignature(signatureHeader);
  if (!parsed) throw new Error("Invalid Stripe signature header.");

  const age = Math.abs(Math.floor(Date.now() / 1000) - parsed.timestamp);
  if (age > STRIPE_SIGNATURE_TOLERANCE_SECONDS) {
    throw new Error("Expired Stripe webhook signature.");
  }

  const expected = createHmac("sha256", webhookSecret)
    .update(`${parsed.timestamp}.${rawBody}`, "utf8")
    .digest();

  const valid = parsed.signatures.some((signature) => {
    if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
    const received = Buffer.from(signature, "hex");
    return received.length === expected.length && timingSafeEqual(received, expected);
  });

  if (!valid) throw new Error("Invalid Stripe webhook signature.");
  return JSON.parse(rawBody) as StripeEvent;
}
