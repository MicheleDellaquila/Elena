const { Router } = require("express");
const verifyUser = require("@middleware/verifyUser");
const dataValidation = require("@middleware/dataValidation");
const lessons = require("@controllers/lessons/lessons");

const router = Router();
router.get("/:courseId", verifyUser, dataValidation, lessons);

module.exports = router;
