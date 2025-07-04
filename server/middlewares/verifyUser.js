const { AppError } = require("@middlewares/error");
const { decodeToken } = require("@lib/jwt");
const refreshAccessToken = require("@controllers/auth/refreshAccessToken");

const verifyUser = (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) throw new AppError("Non è stato possibile verificare la tua identità", 404);

    decodeToken(accessToken, process.env.ACCESS_TOKEN);
    next();
  } catch (error) {
    refreshAccessToken(req, res, next);
  }
};

module.exports = { verifyUser };
