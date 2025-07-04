const usersModel = require("@models/users");
const { comparePassword, removePassword } = require("@lib/password");
const setAuthCookies = require("@helpers/setAuthCookies");
const { AppError } = require("@middlewares/error");

const getUserByEmail = async (email) => await usersModel.findOne({ email });

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) throw new AppError("Nessun utente trovato con questa email.", 404);

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new AppError("La password inserita non è corretta.", 401);

    setAuthCookies(res, user._id);
    res.status(200).json({ message: "Login avvenuta con successo", user: removePassword(user._doc) });
  } catch (error) {
    if (error.code) return res.status(error.code).json({ error: error.message });
    else if (error.code) return res.status(error.code).json({ error: error.message });
    else return next(error);
  }
};

module.exports = login;
