import { createHmac, timingSafeEqual } from "node:crypto";
import type { LearningProductId } from "@/content/learning/curriculum";
import { isProductionEnvironment } from "@/config/flags";

export const LEARNING_SESSION_COOKIE = "gng_learning_session";

export type LearningSession = {
  email: string;
  name: string;
  expiresAt: number;
  entitlements: LearningProductId[];
};

export type LearningAccess =
  | { status: "disabled" }
  | { status: "signed-out" }
  | {
      status: "authenticated";
      email: string;
      name: string;
      entitlements: readonly LearningProductId[];
      isPreview: boolean;
    };

type LearningEnvironment = Partial<
  Pick<
    NodeJS.ProcessEnv,
    | "APP_ENV"
    | "CI"
    | "NODE_ENV"
    | "VERCEL_ENV"
    | "GNG_LEARNING_APP_ENABLED"
    | "GNG_LEARNING_DEV_ACCESS"
    | "GNG_LEARNING_DEV_EMAIL"
    | "GNG_LEARNING_DEV_NAME"
    | "GNG_LEARNING_DEV_ENTITLEMENTS"
    | "GNG_LEARNING_SESSION_SECRET"
  >
>;

export function isLearningAppEnabled(
  environment: LearningEnvironment = process.env,
): boolean {
  return environment.GNG_LEARNING_APP_ENABLED === "true";
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createLearningSessionToken(
  session: LearningSession,
  secret: string,
): string {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString(
    "base64url",
  );
  return `${payload}.${signPayload(payload, secret)}`;
}

export function readLearningSessionToken(
  token: string | undefined,
  secret: string | undefined,
  now = Date.now(),
): LearningSession | null {
  if (!token || !secret) return null;
  const [payload, receivedSignature, extra] = token.split(".");
  if (!payload || !receivedSignature || extra) return null;

  const expectedSignature = signPayload(payload, secret);
  const received = Buffer.from(receivedSignature);
  const expected = Buffer.from(expectedSignature);
  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<LearningSession>;
    const entitlements = parsed.entitlements?.filter(
      (item): item is LearningProductId =>
        item === "quick-start" || item === "toolkit",
    );
    if (
      typeof parsed.email !== "string" ||
      !parsed.email.includes("@") ||
      typeof parsed.name !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= now ||
      !entitlements
    ) {
      return null;
    }
    return {
      email: parsed.email.toLowerCase(),
      name: parsed.name,
      expiresAt: parsed.expiresAt,
      entitlements,
    };
  } catch {
    return null;
  }
}

export function resolveLearningAccess(input: {
  environment?: LearningEnvironment;
  sessionToken?: string;
  now?: number;
}): LearningAccess {
  const environment = input.environment ?? process.env;
  if (!isLearningAppEnabled(environment)) return { status: "disabled" };

  if (
    (!isProductionEnvironment(environment) || environment.CI === "true") &&
    environment.GNG_LEARNING_DEV_ACCESS === "true"
  ) {
    const previewEntitlements = (
      environment.GNG_LEARNING_DEV_ENTITLEMENTS ?? "quick-start"
    )
      .split(",")
      .map((item) => item.trim())
      .filter(
        (item): item is LearningProductId =>
          item === "quick-start" || item === "toolkit",
      );

    return {
      status: "authenticated",
      email: environment.GNG_LEARNING_DEV_EMAIL ?? "victoria@example.com",
      name: environment.GNG_LEARNING_DEV_NAME ?? "Victoria",
      entitlements: previewEntitlements,
      isPreview: true,
    };
  }

  const session = readLearningSessionToken(
    input.sessionToken,
    environment.GNG_LEARNING_SESSION_SECRET,
    input.now,
  );
  if (!session) return { status: "signed-out" };

  return {
    status: "authenticated",
    email: session.email,
    name: session.name,
    entitlements: session.entitlements,
    isPreview: false,
  };
}

export function hasLearningEntitlement(
  access: LearningAccess,
  product: LearningProductId,
): boolean {
  return (
    access.status === "authenticated" && access.entitlements.includes(product)
  );
}
