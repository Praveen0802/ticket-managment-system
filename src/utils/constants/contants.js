export const hideLeftMenuPages = [
  "/login",
  "/reset-password/token/[index]",
  "/verify-email/token/[index]",
];
export const hideHeaderPages = [
  "/login",
  "/reset-password/token/[index]",
  "/verify-email/token/[index]",
];

export const nonAuthRequiredAPI = [
  "/auth/login",
  "/auth/password/reset-request",
  "/settings/reset-password",
  "/auth/register",
  "/auth/verify-email",
  "/auth/resend-verify-email",
  "/settings/dialing-code",
];

export const nonAuthRequiredPages = [
  "/reset-password/token/",
  "/verify-email/token/",
];
