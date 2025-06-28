const express = require("express");
const router = express.Router();
const dataValidation = require("@middlewares/dataValidation");
const signUp = require("@controllers/auth/signup");
const login = require("@controllers/auth/login");
const logout = require("@controllers/auth/logout");

router.post("/register", dataValidation, signUp);
router.post("/login", dataValidation, login);
router.post("/logout", logout);
module.exports = router;
