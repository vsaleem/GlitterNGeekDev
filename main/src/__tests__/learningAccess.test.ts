import {
  createLearningSessionToken,
  hasLearningEntitlement,
  isLearningAppEnabled,
  readLearningSessionToken,
  resolveLearningAccess,
} from "@/learning/access";

describe("learning application access", () => {
  it("keeps the application closed unless its server flag is enabled", () => {
    expect(isLearningAppEnabled({})).toBe(false);
    expect(isLearningAppEnabled({ GNG_LEARNING_APP_ENABLED: "false" })).toBe(
      false,
    );
    expect(isLearningAppEnabled({ GNG_LEARNING_APP_ENABLED: "true" })).toBe(
      true,
    );
  });

  it("allows explicit development preview access outside production", () => {
    const access = resolveLearningAccess({
      environment: {
        NODE_ENV: "development",
        GNG_LEARNING_APP_ENABLED: "true",
        GNG_LEARNING_DEV_ACCESS: "true",
        GNG_LEARNING_DEV_EMAIL: "vic@example.com",
        GNG_LEARNING_DEV_NAME: "Vic",
      },
    });

    expect(access).toEqual({
      status: "authenticated",
      email: "vic@example.com",
      name: "Vic",
      entitlements: ["quick-start"],
      isPreview: true,
    });
  });

  it("can preview a purchased Toolkit with an explicit development entitlement", () => {
    const access = resolveLearningAccess({
      environment: {
        NODE_ENV: "development",
        GNG_LEARNING_APP_ENABLED: "true",
        GNG_LEARNING_DEV_ACCESS: "true",
        GNG_LEARNING_DEV_ENTITLEMENTS: "quick-start, toolkit",
      },
    });

    expect(access.status).toBe("authenticated");
    if (access.status === "authenticated") {
      expect(access.entitlements).toEqual(["quick-start", "toolkit"]);
    }
  });

  it("never honors the development bypass in production", () => {
    expect(
      resolveLearningAccess({
        environment: {
          NODE_ENV: "production",
          GNG_LEARNING_APP_ENABLED: "true",
          GNG_LEARNING_DEV_ACCESS: "true",
        },
      }),
    ).toEqual({ status: "signed-out" });
  });

  it("verifies signed, expiring customer sessions", () => {
    const secret = "test-secret-with-enough-entropy-for-tests";
    const now = Date.UTC(2026, 6, 22);
    const token = createLearningSessionToken(
      {
        email: "Customer@Example.com",
        name: "Customer",
        expiresAt: now + 60_000,
        entitlements: ["quick-start"],
      },
      secret,
    );

    const session = readLearningSessionToken(token, secret, now);
    expect(session?.email).toBe("customer@example.com");
    expect(session?.entitlements).toEqual(["quick-start"]);
    expect(readLearningSessionToken(`${token}x`, secret, now)).toBeNull();
    expect(readLearningSessionToken(token, secret, now + 60_001)).toBeNull();
  });

  it("keeps Quick Start and paid Toolkit entitlements separate", () => {
    const access = {
      status: "authenticated" as const,
      email: "customer@example.com",
      name: "Customer",
      entitlements: ["quick-start"] as const,
      isPreview: false,
    };
    expect(hasLearningEntitlement(access, "quick-start")).toBe(true);
    expect(hasLearningEntitlement(access, "toolkit")).toBe(false);
  });
});
