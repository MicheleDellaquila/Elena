const { AppError } = require("@middleware/errorHandler");
const { decodeToken } = require("@lib/jwt");
const { Types: { ObjectId }} = require("mongoose");

const recoverUserId = (req) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken || typeof accessToken !== "string") throw new AppError("Unauthorized", 401);

  const decoded = decodeToken(accessToken, process.env.ACCESS_TOKEN);
  if (!decoded._id) throw new AppError("Invalid token", 401);

  const userId = decoded._id;
  if (!ObjectId.isValid(userId)) throw new AppError("Invalid user ID format", 400);

  return userId;
};

module.exports = recoverUserId;
