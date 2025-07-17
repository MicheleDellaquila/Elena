const usersModel = require("@models/users");

const findUserByEmail = async (email) => {
  return await usersModel.findOne({ email });
};

module.exports = findUserByEmail;
