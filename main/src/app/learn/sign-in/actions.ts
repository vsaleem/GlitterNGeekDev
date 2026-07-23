"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function signInRedirect(
  status: "sent" | "invalid" | "unavailable",
): never {
  redirect(`/learn/sign-in?status=${status}`);
}

export async function requestMagicLink(formData: FormData) {
  const emailValue = formData.get("email");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  if (!email || !email.includes("@") || email.length > 254) {
    signInRedirect("invalid");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) signInRedirect("unavailable");

  const requestHeaders = await headers();
  const configuredOrigin = process.env.GNG_SITE_URL?.trim();
  const requestOrigin = requestHeaders.get("origin");
  let origin: string;

  try {
    const siteUrl = new URL(configuredOrigin || requestOrigin || "");
    if (
      siteUrl.protocol !== "https:" &&
      !["localhost", "127.0.0.1"].includes(siteUrl.hostname)
    ) {
      signInRedirect("unavailable");
    }
    origin = siteUrl.origin;
  } catch {
    signInRedirect("unavailable");
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/learn`,
      shouldCreateUser: true,
    },
  });

  if (error) signInRedirect("unavailable");
  signInRedirect("sent");
}
