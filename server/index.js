require("module-alias/register");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const connectToMongoDB = require("@configs/mongodb");
const errorHandler = require("@middlewares/error");

// Load environment variables from .env.local file
const loadEnvironmentVariables = () => {
  const result = dotenv.config({ path: `.env.local`, override: true });
  if (result.error) throw result.error;
};

const configureMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);
};

const createExpressApp = () => {
  const app = express();
  configureMiddlewares(app);
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
