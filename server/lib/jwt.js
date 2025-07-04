const jwt = require("jsonwebtoken");
const { AppError } = require("@middlewares/error");

const generateToken = (data, secret, expiresIn) => jwt.sign(data, secret, { expiresIn });
const decodeToken = (token, secret) => {
  try {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) throw new AppError("Token non valido o scaduto", 401);
      return decoded;
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken, decodeToken };
