const { decodeToken } = require("@lib/jwt");
const findUserById = require("@helpers/findUserById");

const autoLogin = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const decode = decodeToken(accessToken, process.env.ACCESS_TOKEN);
    const user = await findUserById(decode._id);

    res.status(200).json({ user: user });
  } catch (error) {
    next(error);
  }
};

module.exports = autoLogin;
