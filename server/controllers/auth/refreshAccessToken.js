const { AppError } = require("@middleware/errorHandler");
const { generateToken, decodeToken } = require("@lib/jwt");
const { COOKIE_OPTIONS, COOKIE_MAX_AGE_ACCESS, ACCESS_TOKEN_EXPIRY } = require("@constants/authConstants");

const COMPUTED_COOKIE_OPTIONS = { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE_ACCESS };

const generateNewAccessToken = (refreshToken) => {
  const decodedToken = decodeToken(refreshToken, process.env.REFRESH_TOKEN);
  return generateToken({ userId: decodedToken.userId }, process.env.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new AppError("Refresh token mancante", 400);

    const newAccessToken = generateNewAccessToken(refreshToken);
    res.cookie("accessToken", newAccessToken, COMPUTED_COOKIE_OPTIONS);
    res.status(200).json({ message: "Access token aggiornato con successo" });
  } catch (error) {
    next(error);
  }
};

module.exports = refreshAccessToken;
