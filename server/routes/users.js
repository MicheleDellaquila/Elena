const { Router } = require("express");
const multer = require("multer");
const verifyUser = require("@middleware/verifyUser");
const dataValidation = require("@middleware/dataValidation");
const { profileImageStorage, profileImageFilter, limits } = require("@middleware/profileImageStorage");
const userStats = require("@controllers/users/userStats");
const userEnrolledCourses = require("@controllers/users/userEnrolledCourses");
const modifyProfile = require("@controllers/users/modifyProfile");
const modifyProfileImage = require("@controllers/users/modifyProfileImage");

const upload = multer({ storage: profileImageStorage, fileFilter: profileImageFilter, limits });

const router = Router();
router.get("/", verifyUser, userStats);
router.get("/enrolled-courses", verifyUser, userEnrolledCourses);
router.patch("/profile", verifyUser, dataValidation, modifyProfile);
router.patch("/profile/image", verifyUser, upload.single("profileImage"), modifyProfileImage);

module.exports = router;
