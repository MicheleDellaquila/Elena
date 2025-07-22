const { Router } = require('express');
const verifyUser = require('@middleware/verifyUser');
const User = require('@controllers/users/user');
const userEnrolledCourses = require('@controllers/users/userEnrolledCourses');

const router = Router();
router.get('/', verifyUser, User);
router.get("/enrolled-courses", verifyUser, userEnrolledCourses);

module.exports = router;
