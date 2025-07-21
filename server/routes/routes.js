const express = require("express");
const authRoutes = require("./auth");
const coursesRoutes = require("./courses")
const lessonsRoutes = require("./lessons");
const usersRoutes = require("./users");

const routes = express.Router();
routes.use("/auth", authRoutes);
routes.use("/courses", coursesRoutes);
routes.use("/lessons", lessonsRoutes);
routes.use("/users", usersRoutes);

module.exports = routes;