const { AppError } = require("@middleware/errorHandler");
const recoverUserId = require("@helpers/recoverUserId");
const { Types: { ObjectId }} = require("mongoose");
const userModel = require("@models/users");

const user = async (req, res, next) => {
  try {
    const userId = recoverUserId(req);

    const userStatistics = await userModel.aggregate([
      { $match: { _id: new ObjectId(userId) } },
      { $lookup: { from: "enrollments", localField: "_id", foreignField: "userId", as: "enrollments" } },
      {
        $addFields: {
          stats: {
            enrollments: { $size: "$enrollments" },
            activeCourses: { $size: { $filter: { input: "$enrollments", cond: { $eq: ["$$this.status", "In corso"] } } }},
            coursesCompleted: { $size: { $filter: { input: "$enrollments", cond: { $eq: ["$$this.status", "Completato"] } } }},
          },
        },
      },
      { $project: { _id: 0, stats: 1 } },
    ]);
    if (!userStatistics || userStatistics.length === 0) throw new AppError("Utente non trovato", 404);

    res.status(200).json({ data: userStatistics });
  } catch (error) {
    next(error);
  }
};

module.exports = user;
