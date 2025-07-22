const { AppError } = require("@middleware/errorHandler");
const userModel = require("@models/users");
const { Types: { ObjectId }} = require("mongoose");
const recoverUserId = require("@helpers/recoverUserId");
const { validatePaginationParams, calculateOffset, getPaginationParams } = require("@lib/pagination");

const userEnrolledCourses = async (req, res, next) => {
  try {
    const { page, limit } = validatePaginationParams(req.query.page, req.query.limit);
    const offset = calculateOffset(page, limit);
    const userId = recoverUserId(req);

    const userEnrolledCourses = await userModel.aggregate([
      { $match: { _id: new ObjectId(userId) } },
      { $lookup: { from: "enrollments", localField: "_id", foreignField: "userId", as: "enrollments" } },
      { $lookup: { from: "courses", localField: "enrollments.courseId", foreignField: "_id", as: "courses" } },
      { $project: { _id: 0, courses: { $slice: ["$courses", offset, limit] }, totalCourses: { $size: "$courses" } } },
      { $sort: { "enrollments.enrolledAt": 1 } },
    ]);
    if (!userEnrolledCourses || !userEnrolledCourses.length) throw new AppError("Utente non trovato", 404);

    const { courses, totalCourses } = userEnrolledCourses[0];
    const pagination = await getPaginationParams(totalCourses, page, limit);
    return res.status(200).json({ data: courses, pagination });
  } catch (error) {
    next(error);
  }
};

module.exports = userEnrolledCourses;
