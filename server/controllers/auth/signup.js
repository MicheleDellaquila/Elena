const usersModel = require("@models/users");
const { hashPassword } = require("@lib/password");
const setAuthCookies = require("@helpers/setAuthCookies");
const { AppError } = require("@middlewares/error");

const isEmailTaken = async (email) => {
  const user = await usersModel.findOne({ email });
  return !!user;
};

const saveUser = async (userData) => {
  const user = new usersModel(userData);
  const userSaved = await user.save();
  if (!userSaved) throw new AppError("Abbiamo riscontrato un errore");

  return { ...userSaved._doc, password: undefined };
};

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailExists = await isEmailTaken(email);
    if (emailExists) throw new AppError("L'indirizzo email è già in uso.", 409);

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) throw new AppError("Abbiamo riscontrato un errore");

    const newUser = { ...req.body, password: hashedPassword, profileImage: "" };
    const user = await saveUser(newUser);

    setAuthCookies(res, user._id);
    res.status(201).json({ message: "Registrazione avvenuta con successo", user: user });
  } catch (error) {
    if (error.code === 409) return res.status(error.code).json({ message: error.message });
    else if (error.code === 500) return res.status(error.code).json({ message: error.message });
    else return next(error);
  }
};

module.exports = signUp;
