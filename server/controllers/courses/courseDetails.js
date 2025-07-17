const { AppError } = require("@middleware/errorHandler");
const { Types } = require("mongoose");
const coursesModel = require("@models/courses");
const validateObjectId = require("@helpers/validateObjectId");

const courseDetails = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const isCourseIdValid = validateObjectId(courseId);
    if (!isCourseIdValid) throw new AppError("ID corso non valido", 400);

    const courseObjectId = new Types.ObjectId(courseId);
    const courseWithDetails = await coursesModel.aggregate([
      { $match: { _id: courseObjectId } },
      { $lookup: { from: "users", localField: "teacher", foreignField: "_id", as: "teacherInfo" }},
      { $unwind: { path: "$teacherInfo", preserveNullAndEmptyArrays: true } },
      { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" }},
      { $project: { title: 1, description: 1, thumbnail: 1, category: 1, createdAt: 1, teacher: "$teacherInfo.fullName", enrollments: { $size: "$enrollments" } }},
    ]);
    
    if (!courseWithDetails || courseWithDetails.length === 0) throw new AppError("Corso non trovato", 404);

    res.status(200).json({ course: courseWithDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = courseDetails;
