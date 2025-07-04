const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "1d";
const COOKIE_OPTIONS = { httpOnly: true, secure: true, sameSite: "Strict" };
const COOKIE_MAX_AGE_ACCESS = 3600 * 1000; // 1 hour in milliseconds
const COOKIE_MAX_AGE_REFRESH = 86400 * 1000; // 1 day in milliseconds

module.exports = {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  COOKIE_OPTIONS,
  COOKIE_MAX_AGE_ACCESS,
  COOKIE_MAX_AGE_REFRESH,
};
