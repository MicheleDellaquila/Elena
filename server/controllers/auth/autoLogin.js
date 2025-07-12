const { AppError } = require("@middleware/errorHandler");
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
    next(error);
  }
};

module.exports = autoLogin;
