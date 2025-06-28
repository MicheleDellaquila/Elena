const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const SALT_ROUNDS = 10;
  return await bcrypt.hash(password, SALT_ROUNDS);
};

module.exports = { hashPassword };
