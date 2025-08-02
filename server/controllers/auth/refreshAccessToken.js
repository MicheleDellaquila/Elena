const { generateToken, decodeToken } = require("@lib/jwt");
const { COMPUTED_COOKIE_OPTIONS, ACCESS_TOKEN_EXPIRY } = require("@helpers/setAuthCookies");

const generateNewAccessToken = (refreshToken) => {
  const decodedToken = decodeToken(refreshToken, process.env.REFRESH_TOKEN);
  return generateToken({ userId: decodedToken._id }, process.env.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const newAccessToken = generateNewAccessToken(refreshToken);
    res.cookie("accessToken", newAccessToken, COMPUTED_COOKIE_OPTIONS);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};

module.exports = refreshAccessToken;
