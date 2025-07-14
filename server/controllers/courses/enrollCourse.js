const mongoose = require("mongoose");
const { AppError } = require("@middleware/errorHandler");
const enrollmentsModel = require("@models/enrollments");
const findUserById = require("@models/users");
const findCourseById = require("@models/courses");

const { ObjectId } = mongoose.Types;

const enrollCourse = async (req, res, next) => {
  try {
    const { courseId, userId } = req.params;

    // Check if course and user exist
    const user = await findUserById(new ObjectId(userId));
    if (!user) throw new AppError("Utente non trovato", 404);

    const course = await findCourseById(new ObjectId(courseId));
    if (!course) throw new AppError("Corso non trovato", 404);

    const enrollData = { status: "Da fare", progress: 0, userId, courseId };
    const enrollment = new enrollmentsModel(enrollData);
    if (!(await enrollment.save())) throw new AppError("Non è stato possibile salvare l'iscrizione", 500);

    res.status(201).json({ message: "Iscrizione al corso effettuata con successo" });
  } catch (error) {
    next(error);
  }
};

module.exports = enrollCourse;
