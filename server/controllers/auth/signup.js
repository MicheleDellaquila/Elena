const usersModel = require("@models/users");
const { hashPassword } = require("@lib/password");
const { setAuthCookies } = require("@helpers/setAuthCookies");

const isEmailTaken = async (email) => {
  const user = await usersModel.findOne({ email });
  return !!user;
};

const saveUser = async (userData) => {
  const user = new usersModel(userData);
  const userSaved = await user.save();
  if (!userSaved) throw new Error("Abbiamo riscontrato un errore");

  return { ...userSaved._doc, password: undefined };
};

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailExists = await isEmailTaken(email);
    if (emailExists) throw new Error("L'indirizzo email è già in uso.");

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) throw new Error("Abbiamo riscontrato un errore");

    const newUser = { ...req.body, password: hashedPassword, profileImage: "" };
    const user = await saveUser(newUser);

    setAuthCookies(res, user._id);
    res.status(201).json({ message: "Registrazione avvenuta con successo", user: user });
  } catch (error) {
    if (error.message === "L'indirizzo email è già in uso.") return res.status(409).json({ message: error.message });
    else if (error.message === "Abbiamo riscontrato un errore") return res.status(500).json({ message: error.message });
    else return next(error);
  }
};

module.exports = signUp;
