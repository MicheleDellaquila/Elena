const usersModel = require("@models/users");
const { comparePassword, removePassword } = require("@lib/password");
const { setAuthCookies } = require("@helpers/setAuthCookies");

const getUserByEmail = async (email) => await usersModel.findOne({ email });

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if(!user) throw new Error("Nessun utente trovato con questa email.");

    const isPasswordValid = await comparePassword(password, user.password)
    if(!isPasswordValid) throw new Error("La password inserita non è corretta.");

    setAuthCookies(res, user._id);
    res.status(200).json({ message: "Login avvenuta con successo", user: removePassword(user) });
  } catch (error) {
    if(error.message === "Nessun utente trovato con questa email.") return res.status(404). json({ error: error.message });
    else if(error.message === "La password inserita non è corretta.") return res.status(401).json({ error: error.message });
    else return next(error);
  }
};

module.exports = login;
