const { AppError } = require("@middleware/errorHandler")

const getCourses = async (req, res, next) => {
  try {
    console.log("Fetching courses...");
  } catch(error) {
    next(error)
  }
}

module.exports = getCourses