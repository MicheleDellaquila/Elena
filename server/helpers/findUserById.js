const usersModel = require("@models/users");
const { removePassword } = require("@lib/password");

const findUserById = async (userId) => {
  const user = await usersModel.findById(userId);
  const userWithoutPassword = removePassword(user._doc);
  return userWithoutPassword;
};

module.exports = findUserById;
