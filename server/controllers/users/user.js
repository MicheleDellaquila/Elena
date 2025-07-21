const { AppError } = require("@middleware/errorHandler");
const { decodeToken } = require("@lib/jwt");
const { Types: { ObjectId }} = require("mongoose");
const userModel = require("@models/users");

const recoverUserId = (req) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    console.error("Access token mancante");
    throw new AppError();
  }

  const userId = decodeToken(accessToken, process.env.ACCESS_TOKEN)._id;
  if (!userId || !ObjectId.isValid(userId)) {
    console.error("ID utente non valido");
    throw new AppError();
  }

  return userId;
}

const user = async (req, res, next) => {
  try {
    const userId = recoverUserId(req);

    const userData = await userModel.aggregate([
      { $match: { _id: new ObjectId(userId) } },
      { $lookup: { from: "enrollments", localField: "_id", foreignField: "userId", as: "enrollments" } },
      {
        $addFields: {
          stats: {
            enrollments: { $size: "$enrollments" },
            activeCourses: {
              $size: { $filter: { input: "$enrollments", cond: { $eq: ["$$this.status", "In corso"] } } },
            },
            coursesCompleted: {
              $size: { $filter: { input: "$enrollments", cond: { $eq: ["$$this.status", "Completato"] } } },
            },
          },
        },
      },
      { $project: { name: 1, email: 1, role: 1, stats: 1, createdAt: 1 } },
    ]);
    if (!userData || userData.length === 0) throw new AppError("Utente non trovato", 404);

    res.status(200).json({ data: userData });
  } catch (error) {
    next(error);
  }
};

module.exports = user;
