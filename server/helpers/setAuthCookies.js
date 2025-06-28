const { generateToken } = require("@lib/jwt");

const setAuthCookies = (res, userId) => {
  const accessToken = generateToken({ _id: userId }, process.env.ACCESS_TOKEN, "1h");
  const refreshToken = generateToken({ _id: userId }, process.env.REFRESH_TOKEN, "1d");

  res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600 * 1000 });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 86400 * 1000 });
};

module.exports = setAuthCookies;