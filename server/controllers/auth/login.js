const { comparePassword, removePassword } = require("@lib/password");
const findUserByEmail = require("@helpers/findUserByEmail");
const setAuthCookies = require("@helpers/setAuthCookies");
const { AppError } = require("@middleware/errorHandler");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("Nessun utente trovato con questa email.", 404);

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new AppError("La password inserita non è corretta.", 401);

    setAuthCookies(res, user._id);
    res.status(200).json({ message: "Login avvenuta con successo", user: removePassword(user._doc) });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
