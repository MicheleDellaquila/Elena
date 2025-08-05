const { AppError } = require("@middleware/errorHandler");
const usersModel = require("@models/users");
const { removePassword } = require("@lib/password");

const findUserById = async (userId) => {
  const user = await usersModel.findById(userId);
  if (!user) throw new AppError("Utente non trovato", 404);
  const userWithoutPassword = removePassword(user._doc);
  return userWithoutPassword;
};

module.exports = findUserById;
