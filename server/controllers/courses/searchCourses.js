const { AppError } = require("@middleware/errorHandler");
const coursesModel = require("@models/courses");
const { validatePaginationParams, calculateOffset, getPaginationParams } = require("@lib/pagination");

const searchCourses = async (req, res, next) => {
   try {
      const { page, limit, title, category, teacher } = req.query;
      const { page: currentPage, limit: pageLimit } = validatePaginationParams(page, limit);
      const offset = calculateOffset(currentPage, pageLimit);

      // Build search filters
      const searchFilters = {};
      if (title) searchFilters.title = { $regex: title, $options: "i" };
      if (category) searchFilters.category = category;
      if (teacher) searchFilters.teacher = teacher;

      // Retrieve courses with teacher name
      const coursesWithTeacher = await coursesModel.aggregate([
        ...(Object.keys(searchFilters).length > 0 ? [{ $match: searchFilters }] : []),
        {
          $facet: {
            courses: [
              { $lookup: { from: "users", localField: "teacher", foreignField: "_id", as: "teacherInfo" } },
              { $unwind: { path: "$teacherInfo", preserveNullAndEmptyArrays: true } },
              { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
              { $project: { title: 1, description: 1, thumbnail: 1, category: 1, createdAt: 1, teacher: "$teacherInfo.fullName", enrollments: { $size: "$enrollments" } }},
              { $sort: { createdAt: -1 } },
              { $skip: offset },
              { $limit: pageLimit },
            ],
          },
        },
      ]);
      
      if (!coursesWithTeacher || coursesWithTeacher[0].length === 0) throw new AppError("Nessun corso trovato", 404);
  
      const pagination = await getPaginationParams(page, limit);
      return res.status(200).json({ message: "Corsi recuperati con successo", ...coursesWithTeacher[0], pagination });
    } catch (error) {
      next(error);
    }
};

module.exports = searchCourses;
