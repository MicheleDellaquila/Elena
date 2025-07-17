const { AppError } = require("@middleware/errorHandler");
const findUserById = require("@helpers/findUserById");
const coursesModel = require("@models/courses");

const createCourse = async (req, res, next) => {
  try {
    const { title, teacher } = req.body;
    const { filename: thumbnail } = req.file;

    const user = await findUserById(teacher);
    if (!user || user.role !== "teacher") throw new AppError("Non sei autorizzato a creare corsi", 403);

    const course = await coursesModel.find().and([{ title }, { teacher }]);
    if (course.length) throw new AppError("Corso già esistente", 400);

    const newCourse = await coursesModel.create({ ...req.body, thumbnail });
    if (!(await newCourse.save())) throw new AppError("Errore durante la creazione del corso", 500);

    res.status(201).json({ course: newCourse });
  } catch (error) {
    next(error);
  }
};

module.exports = createCourse;
