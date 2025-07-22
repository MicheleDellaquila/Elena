const { Router } = require("express");
const multer = require("multer");
const { courseThumbnailStorage, courseThumbnailFilter, limits } = require("@middleware/courseThumbnailStorage");

// Importing necessary controllers and middlewares
const verifyUser = require("@middleware/verifyUser");
const dataValidation = require("@middleware/dataValidation");
const createCourse = require("@controllers/courses/createCourse");
const getCourses = require("@controllers/courses/getCourses");
const enrollCourse = require("@controllers/courses/enrollCourse");
const searchCourses = require("@controllers/courses/searchCourses");
const courseDetails = require("@controllers/courses/courseDetails");

const upload = multer({ storage: courseThumbnailStorage, fileFilter: courseThumbnailFilter, limits });

const router = Router();
router.post("/create/course", verifyUser, upload.single("thumbnail"), dataValidation, createCourse);
router.get("/", verifyUser, getCourses);
router.post("/:courseId/enroll/:userId", verifyUser, dataValidation, enrollCourse);
router.post("/search", verifyUser, dataValidation, searchCourses);
router.get("/:courseId", verifyUser, courseDetails);

module.exports = router;
