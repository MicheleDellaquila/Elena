const { generateToken, decodeToken } = require("@lib/jwt");
const { COMPUTED_COOKIE_OPTIONS, ACCESS_TOKEN_EXPIRY } = require("@helpers/setAuthCookies");
const findUserById = require("@helpers/findUserById");

const generateNewAccessToken = (refreshToken) => {
  const decodedToken = decodeToken(refreshToken, process.env.REFRESH_TOKEN);
  const newAccessToken = generateToken({ _id: decodedToken._id }, process.env.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
  return { accessToken: newAccessToken, _id: decodedToken._id };
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const { accessToken, _id } = generateNewAccessToken(refreshToken);
    const user = await findUserById(_id);

    res.cookie("accessToken", accessToken, COMPUTED_COOKIE_OPTIONS);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = refreshAccessToken;
