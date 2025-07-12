const { Router } = require("express");
const getCourses = require("@controllers/courses/getCourses");

const router = Router();
router.get("/", getCourses);

module.exports = router;
