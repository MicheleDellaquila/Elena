const { AppError } = require("@middleware/errorHandler");
const coursesModel = require("@models/courses");

const findCourseById = async (courseId) => {
  const course = await coursesModel.findById(courseId);
  if (!course) throw new AppError("Corso non trovato", 404);
  return course;
};

module.exports = findCourseById;
