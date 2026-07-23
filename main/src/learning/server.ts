import { notFound, redirect } from "next/navigation";
import type { LearningProductId } from "@/content/learning/curriculum";
import { isProductionEnvironment } from "@/config/flags";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  hasLearningEntitlement,
  isLearningAppEnabled,
  resolveLearningAccess,
  type LearningAccess,
} from "./access";
import { getLearningEntitlements } from "./entitlements";

export async function getLearningAccess(): Promise<LearningAccess> {
  if (!isLearningAppEnabled()) return { status: "disabled" };

  if (!isProductionEnvironment()) {
    return resolveLearningAccess({});
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "signed-out" };

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user?.email || !user.email_confirmed_at) {
    return { status: "signed-out" };
  }

  const entitlementLookup = await getLearningEntitlements(supabase);
  if (!entitlementLookup.ok) return { status: "signed-out" };

  const displayName =
    typeof user.user_metadata.full_name === "string"
      ? user.user_metadata.full_name
      : typeof user.user_metadata.name === "string"
        ? user.user_metadata.name
        : user.email.split("@")[0];

  return {
    status: "authenticated",
    email: user.email.toLowerCase(),
    name: displayName,
    entitlements: entitlementLookup.entitlements,
    isPreview: false,
  };
}

export async function requireLearningAccess(
  product?: LearningProductId,
): Promise<Extract<LearningAccess, { status: "authenticated" }>> {
  const access = await getLearningAccess();
  if (access.status === "disabled") notFound();
  if (access.status === "signed-out") redirect("/learn/sign-in");
  if (product && !hasLearningEntitlement(access, product)) {
    redirect(`/learn/no-access?product=${product}`);
  }
  return access;
}
