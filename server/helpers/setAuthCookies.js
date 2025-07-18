const { generateToken } = require("@lib/jwt");

const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "1d";
const COOKIE_OPTIONS = { httpOnly: true, secure: true, sameSite: "Strict" };
const COOKIE_MAX_AGE_ACCESS = 3600 * 1000; // 1 hour in milliseconds
const COOKIE_MAX_AGE_REFRESH = 86400 * 1000; // 1 day in milliseconds
const COMPUTED_COOKIE_OPTIONS = { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE_ACCESS };
const COMPUTED_COOKIE_OPTIONS2 = { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE_REFRESH };

const setAuthCookies = (res, userId) => {
  const accessToken = generateToken({ _id: userId }, process.env.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
  const refreshToken = generateToken({ _id: userId }, process.env.REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY);

  res.cookie("accessToken", accessToken, COMPUTED_COOKIE_OPTIONS);
  res.cookie("refreshToken", refreshToken, COMPUTED_COOKIE_OPTIONS2);
};

module.exports = { setAuthCookies, COMPUTED_COOKIE_OPTIONS, COOKIE_MAX_AGE_ACCESS, ACCESS_TOKEN_EXPIRY };
