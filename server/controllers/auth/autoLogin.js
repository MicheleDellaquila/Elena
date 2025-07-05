const { AppError } = require("@middlewares/error");
const { decodeToken } = require("@lib/jwt");
const findUserById = require("@helpers/findUserById");

const autoLogin = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) throw new AppError("Non è stato possibile verificare la tua identità", 404);

    const decode = decodeToken(accessToken, process.env.ACCESS_TOKEN);
    const user = await findUserById(decode._id);

    res.status(200).json({ message: "Accesso automatico riuscito.", user: user });
  } catch (error) {
    if (error.name === "TokenExpiredError") return res.status(401).json({ error: "Utente non autorizzato" });
    next(error);
  }
};

module.exports = autoLogin;
