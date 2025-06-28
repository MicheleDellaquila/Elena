const jwt = require("jsonwebtoken");

const generateToken = (data, secret, expiresIn) => jwt.sign(data, secret, { expiresIn });

module.exports = { generateToken }