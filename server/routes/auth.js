const express = require("express");
const router = express.Router();
const dataValidation = require("@middlewares/dataValidation");
const signUp = require("@controllers/auth/signup");

router.post("/register", dataValidation, signUp);
module.exports = router;
