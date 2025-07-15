const { AppError } = require("@middleware/errorHandler");
const coursesModel = require("@models/courses");

const getPaginationParams = async (current_page, limit = 12) => {
  const total_courses = await coursesModel.countDocuments();
  const total_pages = Math.ceil(total_courses / limit);
  const next_page = current_page < total_pages ? current_page + 1 : null;
  const prev_page = current_page > 1 ? current_page - 1 : null;

  return {
    total_courses,
    current_page,
    total_pages,
    next_page,
    prev_page,
  };
}

// DOCUMENTARE QUESTA PAGINATION
const getCourses = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    if (!page || !limit || isNaN(page) || isNaN(limit)) throw new AppError("Parametri di paginazione non validi", 400);

    // Retrieve courses with teacher name
    const coursesWithTeacher = await coursesModel.aggregate([
      { $lookup: { from: "users", localField: "teacher", foreignField: "_id", as: "teacherInfo" } },
      { $unwind: { path: "$teacherInfo", preserveNullAndEmptyArrays: true } },
      { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
      { $project: { title: 1, description: 1, thumbnail: 1, category: 1, createdAt: 1, teacher: "$teacherInfo.fullName", enrollments: { $size: "$enrollments" } } },
      { $sort: { createdAt: -1 } },
      { $skip: offset },
      { $limit: parseInt(limit) },
    ]);
    
    if (!coursesWithTeacher || coursesWithTeacher.length === 0) throw new AppError("Nessun corso trovato", 404);

    const pagination = await getPaginationParams(page, limit);
    return res.status(200).json({ message: "Corsi recuperati con successo", courses: coursesWithTeacher, pagination });
  } catch (error) {
    next(error);
  }
};

module.exports = getCourses;
