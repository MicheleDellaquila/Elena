const express = require("express");
const authRoutes = require("./auth");

const routes = express.Router();
routes.use("/auth", authRoutes);

module.exports = routes;