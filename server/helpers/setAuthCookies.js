const { generateToken } = require("@lib/jwt");
const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  COOKIE_OPTIONS,
  COOKIE_MAX_AGE_ACCESS,
  COOKIE_MAX_AGE_REFRESH,
} = require("@constants/authConstants");

const COMPUTED_COOKIE_OPTIONS = { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE_ACCESS };
const COMPUTED_COOKIE_OPTIONS2 = { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE_REFRESH };

const setAuthCookies = (res, userId) => {
  const accessToken = generateToken({ _id: userId }, process.env.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
  const refreshToken = generateToken({ _id: userId }, process.env.REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY);

  res.cookie("accessToken", accessToken, COMPUTED_COOKIE_OPTIONS);
  res.cookie("refreshToken", refreshToken, COMPUTED_COOKIE_OPTIONS2);
};

module.exports = setAuthCookies;
