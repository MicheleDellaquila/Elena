require("module-alias/register");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("@configs/mongodb");
const { errorHandler } = require("@middleware/errorHandler");
const routes = require("@routes/routes");

const loadEnvironmentVariables = () => {
  const result = dotenv.config({ path: ".env.local", override: true });
  if (result.error) throw result.error;
};

const configureMiddleware = (app) => {
  app.use(cors({ origin: process.env.CORS_ORIGIN_DEV, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

const createExpressApp = () => {
  const app = express();
  configureMiddleware(app);

  // This will register all the routes defined in the routes directory
  app.use("/api/v1", routes);
  app.use(errorHandler);

  const port = process.env.SERVER_PORT || 5000;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

const startApplication = async () => {
  try {
    loadEnvironmentVariables();
    await connectToMongoDB();
    createExpressApp();
  } catch (error) {
    console.error("Error starting application:", error.message);
    process.exit(1);
  }
};

startApplication();
