const { Router } = require("express");
const verifyUser = require("@middleware/verifyUser");
const dataValidation = require("@middleware/dataValidation");
const getCourses = require("@controllers/courses/getCourses");
const enrollCourse = require("@controllers/courses/enrollCourse");

const router = Router();
router.get("/", getCourses);
router.post("/:courseId/enroll/:userId", verifyUser, dataValidation, enrollCourse);

module.exports = router;
