const usersModel = require("@models/users");
const { hashPassword } = require("@lib/password");
const { generateToken } = require("@lib/jwt");

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

    const accessToken = generateToken({ _id: user._id }, process.env.ACCESS_TOKEN, "1h");
    const refreshToken = generateToken({ _id: user._id }, process.env.REFRESH_TOKEN, "1d");
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600 * 1000 });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 86400 * 1000,
    });

    res.status(201).json({ message: "Registrazione avvenuta con successo", user: user });
  } catch (error) {
    if (error.message === "L'indirizzo email è già in uso.") return res.status(409).json({ message: error.message });
    else if (error.message === "Abbiamo riscontrato un errore") return res.status(500).json({ message: error.message });

    next(error);
  }
};

module.exports = signUp;
