const { AppError } = require("@middleware/errorHandler");
const coursesModel = require("@models/courses");

const getCourses = async (req, res, next) => {
  try {
    const enrichedCourses = await coursesModel.aggregate([
      { $lookup: { from: "users", localField: "teacher", foreignField: "_id", as: "teacherInfo" } },
      { $unwind: { path: "$teacherInfo" } },
      { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
      { $project: { title: 1, description: 1, thumbnail: 1, category: 1, createdAt: 1, teacher: "$teacherInfo.fullName", enrollments: { $size: "$enrollments" }}},
      { $sort: { createdAt: -1 } },
    ]);

    if (!enrichedCourses || enrichedCourses.length === 0) throw new AppError("Nessun corso trovato", 404);

    return res.status(200).json({ courses: enrichedCourses });
  } catch (error) {
    next(error);
  }
};

module.exports = getCourses;
