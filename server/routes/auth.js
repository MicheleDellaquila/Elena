const express = require("express");
const router = express.Router();
const dataValidation = require("@middlewares/dataValidation");
const signUp = require("@controllers/auth/signup");
const login = require("@controllers/auth/login");

router.post("/register", dataValidation, signUp);
router.post("/login", dataValidation, login);
module.exports = router;
