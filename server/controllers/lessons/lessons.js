const { AppError } = require("@middleware/errorHandler");
const { Types: { ObjectId } } = require("mongoose");
const lessonsModel = require("@models/lessons");

const lessons = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const lessonsWithResources = await lessonsModel.aggregate([
      { $match: { courseId: new ObjectId(courseId) } },
      { $lookup: { from: "resources", localField: "_id", foreignField: "lessonId", as: "resources" } },
      { $sort: { createdAt: -1 } },
    ]);
    if (lessonsWithResources.length === 0) throw new AppError("Corso non trovato o nessuna lezione esistente.", 404);

    res.status(200).json({ lessons: lessonsWithResources });
  } catch (error) {
    next(error);
  }
};

module.exports = lessons;
