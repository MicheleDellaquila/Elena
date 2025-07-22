const { Router } = require('express');
const verifyUser = require('@middleware/verifyUser');
const userStats = require("@controllers/users/userStats");
const userEnrolledCourses = require('@controllers/users/userEnrolledCourses');

const router = Router();
router.get('/', verifyUser, userStats);
router.get("/enrolled-courses", verifyUser, userEnrolledCourses);

module.exports = router;
