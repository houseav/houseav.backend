export const MAILGUN_DOMAIN = 'support.houseav.life';
export const MAILGUN_USER = 'Houseav Support';
export const MAILGUN_FROM_NO_REPLY = 'no-reply@support.houseav.life';
export const FORGOT_PASSWORD_ENDPOINT_LOCAL =
  process.env.FORGOT_PASSWORD_ENDPOINT_LOCAL_ENV ??
  'http://localhost:5173/forgot-password';
export const FORGOT_PASSWORD_ENDPOINT =
  process.env.FORGOT_PASSWORD_ENDPOINT_ENV ??
  'https://localhost:5173/forgot-password';
export const KICKOUT_USER_ENDPOINT =
  process.env.KICKOUT_USER_ENDPOINT_ENV ??
  'https://localhost:5173/profile-verified';

export enum ADMIN_DASHBOARD_VERIFIER {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
}
