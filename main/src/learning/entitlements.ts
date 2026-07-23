import type { SupabaseClient } from "@supabase/supabase-js";
import type { LearningProductId } from "@/content/learning/curriculum";

const LEARNING_PRODUCTS: readonly LearningProductId[] = [
  "quick-start",
  "toolkit",
];

export type EntitlementLookup =
  | { ok: true; entitlements: LearningProductId[] }
  | { ok: false; entitlements: [] };

export async function getLearningEntitlements(
  supabase: SupabaseClient,
): Promise<EntitlementLookup> {
  const { data, error } = await supabase
    .from("learning_entitlements")
    .select("product_id")
    .is("revoked_at", null);

  if (error) return { ok: false, entitlements: [] };

  const entitlements = (data ?? [])
    .map(({ product_id }) => product_id)
    .filter((productId): productId is LearningProductId =>
      LEARNING_PRODUCTS.includes(productId as LearningProductId),
    );

  return { ok: true, entitlements: [...new Set(entitlements)] };
}

export async function grantQuickStartEntitlement(
  supabase: SupabaseClient,
): Promise<boolean> {
  const { error } = await supabase.rpc("grant_quick_start");
  return !error;
}
