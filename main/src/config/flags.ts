const readBooleanFlag = (value: string | undefined): boolean => {
  return value === "true";
};

export const flags = {
  coursesPageReleaseProd: readBooleanFlag(
    process.env.NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD
  ),
} as const;

export type FeatureFlag = keyof typeof flags;