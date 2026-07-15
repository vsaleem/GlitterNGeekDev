const readBooleanFlag = (value: string | undefined): boolean => {
  return value === "true";
};

type ReleaseEnvironment = Partial<
  Pick<
    NodeJS.ProcessEnv,
    | "APP_ENV"
    | "NODE_ENV"
    | "VERCEL_ENV"
    | "NEXT_PUBLIC_PORTFOLIO_PAGE_RELEASE_PROD"
  >
>;

export const flags = {
  coursesPageReleaseProd: readBooleanFlag(
    process.env.NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD
  ),
  portfolioPageReleaseProd: readBooleanFlag(
    process.env.NEXT_PUBLIC_PORTFOLIO_PAGE_RELEASE_PROD,
  ),
} as const;

export type FeatureFlag = keyof typeof flags;

export function isProductionEnvironment(
  environment: ReleaseEnvironment = process.env,
): boolean {
  return (
    environment.NODE_ENV === "production" ||
    environment.APP_ENV === "production" ||
    environment.VERCEL_ENV === "production"
  );
}

export function isPortfolioPageReleased(
  environment: ReleaseEnvironment = process.env,
): boolean {
  if (!isProductionEnvironment(environment)) {
    return true;
  }

  return readBooleanFlag(
    environment.NEXT_PUBLIC_PORTFOLIO_PAGE_RELEASE_PROD,
  );
}
