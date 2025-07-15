const { Router } = require("express");
const verifyUser = require("@middleware/verifyUser");
const dataValidation = require("@middleware/dataValidation");
const getCourses = require("@controllers/courses/getCourses");
const enrollCourse = require("@controllers/courses/enrollCourse");
const searchCourses = require("@controllers/courses/searchCourses");

const router = Router();
router.get("/", verifyUser, getCourses);
router.post("/:courseId/enroll/:userId", verifyUser, dataValidation, enrollCourse);
router.post("/search", verifyUser, dataValidation, searchCourses);

module.exports = router;
