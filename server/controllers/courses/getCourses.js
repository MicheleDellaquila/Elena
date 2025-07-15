const { AppError } = require("@middleware/errorHandler");
const coursesModel = require("@models/courses");
const { validatePaginationParams, calculateOffset, getPaginationParams } = require("@lib/pagination");

const getCourses = async (req, res, next) => {
  try {
    const { page, limit } = validatePaginationParams(req.query.page, req.query.limit);
    const offset = calculateOffset(page, limit);

    // Retrieve courses with teacher name
    const coursesWithTeacher = await coursesModel.aggregate([
      {
        $facet: {
          data: [
            { $lookup: { from: "users", localField: "teacher", foreignField: "_id", as: "teacherInfo" } },
            { $unwind: { path: "$teacherInfo", preserveNullAndEmptyArrays: true } },
            { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
            { $project: { title: 1, description: 1, thumbnail: 1, category: 1, createdAt: 1, teacher: "$teacherInfo.fullName", enrollments: { $size: "$enrollments" } } },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: parseInt(limit) },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    if (!coursesWithTeacher || coursesWithTeacher.length === 0) throw new AppError("Nessun corso trovato", 404);

    const pagination = await getPaginationParams(page, limit);
    return res.status(200).json({ message: "Corsi recuperati con successo", courses: coursesWithTeacher, pagination });
  } catch (error) {
    next(error);
  }
};

module.exports = getCourses;
