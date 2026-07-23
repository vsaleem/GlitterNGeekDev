import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { LearningProductId } from "@/content/learning/curriculum";
import {
  hasLearningEntitlement,
  LEARNING_SESSION_COOKIE,
  resolveLearningAccess,
  type LearningAccess,
} from "./access";

export async function getLearningAccess(): Promise<LearningAccess> {
  const cookieStore = await cookies();
  return resolveLearningAccess({
    sessionToken: cookieStore.get(LEARNING_SESSION_COOKIE)?.value,
  });
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
