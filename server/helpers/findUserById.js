const usersModel = require("@models/users");
const { AppError } = require("@middlewares/error");
const { removePassword } = require("@lib/password")

const findUserById = async (userId) => {
  try {
    const user = await usersModel.findById(userId);
    const userWithoutPassword = removePassword(user._doc);
    return userWithoutPassword;
  } catch (error) {
    throw new AppError("Utente non trovato", 404);
  }
};

module.exports = findUserById;
