import {
  isPortfolioPageReleased,
  isProductionEnvironment,
} from "@/config/flags";

describe("feature flags", () => {
  it("identifies production from Next, app, or Vercel runtime markers", () => {
    expect(isProductionEnvironment({ NODE_ENV: "production" })).toBe(true);
    expect(isProductionEnvironment({ APP_ENV: "production" })).toBe(true);
    expect(isProductionEnvironment({ VERCEL_ENV: "production" })).toBe(true);
    expect(isProductionEnvironment({ NODE_ENV: "development" })).toBe(false);
  });

  it("keeps Portfolio available outside production", () => {
    expect(
      isPortfolioPageReleased({
        NODE_ENV: "development",
        NEXT_PUBLIC_PORTFOLIO_PAGE_RELEASE_PROD: "false",
      }),
    ).toBe(true);
  });

  it("hides Portfolio by default in production", () => {
    expect(isPortfolioPageReleased({ NODE_ENV: "production" })).toBe(false);
    expect(
      isPortfolioPageReleased({
        VERCEL_ENV: "production",
        NEXT_PUBLIC_PORTFOLIO_PAGE_RELEASE_PROD: "false",
      }),
    ).toBe(false);
  });

  it("releases Portfolio in production only when explicitly enabled", () => {
    expect(
      isPortfolioPageReleased({
        NODE_ENV: "production",
        NEXT_PUBLIC_PORTFOLIO_PAGE_RELEASE_PROD: "true",
      }),
    ).toBe(true);
  });
});
