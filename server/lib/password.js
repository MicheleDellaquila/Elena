const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPassword = async (password) => await bcrypt.hash(password, SALT_ROUNDS);
const comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);
const removePassword = (user) => ({ ...user, password: undefined });

module.exports = { hashPassword, comparePassword, removePassword };
