const usersModel = require("@models/users");

const signUp = async (req, res, next) => {
  const { fullname, email, password, role } = req.body;

  res.status(200).json({ fullname, email, password, role });
};

module.exports = signUp;
