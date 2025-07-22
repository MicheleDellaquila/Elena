const usersModel = require("@models/users");
const findUserByEmail = require("@helpers/findUserByEmail");
const { hashPassword } = require("@lib/password");
const { removePassword } = require("@lib/password");
const { setAuthCookies } = require("@helpers/setAuthCookies");
const { AppError } = require("@middleware/errorHandler");

const isEmailTaken = async (email) => Boolean(await findUserByEmail(email));

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailExists = await isEmailTaken(email);
    if (emailExists) throw new AppError("L'indirizzo email è già in uso.", 409);

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) throw new AppError("Abbiamo riscontrato un errore", 500);

    const newUser = { ...req.body, password: hashedPassword, profileImage: "" };
    const user = await usersModel.create(newUser);
    if (!user) throw new AppError("Abbiamo riscontrato un errore");

    setAuthCookies(res, user._id);
    res.status(201).json({ user: removePassword(user._doc) });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
