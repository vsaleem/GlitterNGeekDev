const readBooleanFlag = (value: string | undefined): boolean => {
  return value === "true";
};

export const flags = {
//   enableWorkshopRegistration: readBooleanFlag(
//     process.env.NEXT_PUBLIC_ENABLE_WORKSHOP_REGISTRATION
//   ),
//   enableContactForm: readBooleanFlag(
//     process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM
//   ),
  coursesPageReleaseProd: readBooleanFlag(
    process.env.NEXT_PUBLIC_COURSES_PAGE_RELEASE_PROD
    ),
} as const;

export type FeatureFlag = keyof typeof flags;