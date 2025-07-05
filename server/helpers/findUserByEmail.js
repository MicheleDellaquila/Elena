const usersModel = require("@models/users");
const { AppError } = require("@middlewares/error");

const findUserByEmail = async (email) => {
  try {
    return await usersModel.findOne({ email });
  } catch (error) {
    throw new AppError("Nessun utente trovato con questa email.", 404);
  }
};

module.exports = findUserByEmail;
