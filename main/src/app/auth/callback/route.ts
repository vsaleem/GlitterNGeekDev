import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { grantQuickStartEntitlement } from "@/learning/entitlements";

function getSafeNextPath(
  rawNext: string | null,
  requestOrigin: string,
): string {
  if (!rawNext) return "/learn";
  if (rawNext.includes("\\") || rawNext.startsWith("//")) return "/learn";

  try {
    const target = new URL(rawNext, requestOrigin);
    const isRelativePath = rawNext.startsWith("/");
    const isAbsoluteUrl = /^https?:\/\//i.test(rawNext);
    if (
      target.origin !== requestOrigin ||
      (!isRelativePath && !isAbsoluteUrl)
    ) {
      return "/learn";
    }
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return "/learn";
  }
}

export async function GET(request: NextRequest) {
  const callbackUrl = new URL(request.url);
  const nextPath = getSafeNextPath(
    callbackUrl.searchParams.get("next"),
    callbackUrl.origin,
  );
  const code = callbackUrl.searchParams.get("code");
  const supabase = await createSupabaseServerClient();

  if (!code || !supabase) {
    return NextResponse.redirect(
      new URL("/learn/sign-in?status=unavailable", callbackUrl.origin),
    );
  }

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return NextResponse.redirect(
      new URL("/learn/sign-in?status=unavailable", callbackUrl.origin),
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user?.email || !user.email_confirmed_at) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/learn/sign-in?status=unavailable", callbackUrl.origin),
    );
  }

  const granted = await grantQuickStartEntitlement(supabase);
  if (!granted) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/learn/sign-in?status=unavailable", callbackUrl.origin),
    );
  }

  return NextResponse.redirect(new URL(nextPath, callbackUrl.origin));
}
