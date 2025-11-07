export const UserRole = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const CatFormType = {
  FIND_MY_CAT: "FIND_MY_CAT",
  REPORT_CAT_FOUND: "REPORT_CAT_FOUND",
} as const;
export type CatFormType = (typeof CatFormType)[keyof typeof CatFormType];
