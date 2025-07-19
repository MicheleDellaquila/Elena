const { AppError } = require("@middleware/errorHandler");
const findUserById = require("@helpers/findUserById");
const coursesModel = require("@models/courses");
const { deleteDirectoryWithContents } = require("@lib/fileSystem");

const cleanupCourseFiles = async (courseId, file) => {
  if (!courseId || !file) return;

  const rootPath = "uploads";
  const coursePath = `${rootPath}/courses/${courseId}`;
  await deleteDirectoryWithContents(coursePath);
};

const createCourse = async (req, res, next) => {
  const { title, teacher } = req.body;
  const { filename: thumbnail } = req.file;
  const { courseId } = req;

  try {
    const user = await findUserById(teacher);
    if (!user || user.role !== "teacher") throw new AppError("Non sei autorizzato a creare corsi", 403);

    const courseCount = await coursesModel.countDocuments({ title, teacher });
    if (courseCount) throw new AppError("Corso già esistente", 400);

    const newCourse = await coursesModel.create({ _id: courseId, ...req.body, thumbnail });
    res.status(201).json({ course: newCourse });
  } catch (error) {
    setImmediate(async () => await cleanupCourseFiles(courseId, thumbnail));
    next(error);
  }
};

module.exports = createCourse;
