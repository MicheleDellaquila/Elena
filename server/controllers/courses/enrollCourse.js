const { AppError } = require("@middleware/errorHandler");
const enrollmentsModel = require("@models/enrollments");

const enrollCourse = async (req, res, next) => {
  try {
    const { courseId, userId } = req.params;

    const enrollData = { status: "Da fare", progress: 0, userId, courseId };
    const enrollment = new enrollmentsModel(enrollData);
    if (!(await enrollment.save())) throw new AppError("Non è stato possibile salvare l'iscrizione", 500);

    res.status(201).json({ enrollCourse: enrollment });
  } catch (error) {
    next(error);
  }
};

module.exports = enrollCourse;
