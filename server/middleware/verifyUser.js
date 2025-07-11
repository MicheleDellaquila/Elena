const { AppError } = require("@middlewares/error");
const { decodeToken } = require("@lib/jwt");

const verifyUser = (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) throw new AppError("Non è stato possibile verificare la tua identità", 404);

    decodeToken(accessToken, process.env.ACCESS_TOKEN);
    next();
  } catch (error) {
    if(error.name === "TokenExpiredError") return res.status(401).json({ error: "Token di accesso richiesto." });
    next(error);
  }
};

module.exports = verifyUser;
