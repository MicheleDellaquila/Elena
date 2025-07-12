const express = require("express");
const authRoutes = require("./auth");
const coursesRoutes = require("./courses")

const routes = express.Router();
routes.use("/auth", authRoutes);
routes.use("/courses", coursesRoutes);

module.exports = routes;