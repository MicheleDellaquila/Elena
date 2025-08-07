const { AppError } = require("@middleware/errorHandler");
const enrollmentsModel = require("@models/enrollments");
const { Types: { ObjectId }} = require("mongoose");
const recoverUserId = require("@helpers/recoverUserId");

const userEnrolledCourses = async (req, res, next) => {
  try {
    const userId = recoverUserId(req);

    const userEnrolledCourses = await enrollmentsModel.aggregate([
      { $match: { userId: new ObjectId(userId) }},
      { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userInfo" }},
      { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "courseInfo" }},
      { $lookup: { from: "users", localField: "courseInfo.teacher", foreignField: "_id", as: "teacherInfo" }},
      { $unwind: "$courseInfo" },
      { $unwind: "$teacherInfo" },
      { $project: { status: 1, progress: 1, enrolledAt: 1, courseId: "$courseInfo._id", title: "$courseInfo.title", category: "$courseInfo.category", teacherName: "$teacherInfo.fullName", teacherEmail: "$teacherInfo.email" }},
      { $sort: { enrolledAt: 1 }},
    ]);
    
    if (!userEnrolledCourses || !userEnrolledCourses.length) throw new AppError("Nessun corso trovato", 404);

    return res.status(200).json({ data: userEnrolledCourses });
  } catch (error) {
    next(error);
  }
};

module.exports = userEnrolledCourses;