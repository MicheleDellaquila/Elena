const jwt = require("jsonwebtoken");
const { AppError } = require("@middleware/errorHandler");

const generateToken = (data, secret, expiresIn) => jwt.sign(data, secret, { expiresIn });
const decodeToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    if(!decoded) throw new AppError("Token non valido o scaduto", 401);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken, decodeToken };
