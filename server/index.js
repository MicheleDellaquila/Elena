const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const connectToMongoDB = require("./configs/mongodb");
const errorHandler = require("./middlewares/error");

// Load environment variables from .env.local file
dotenv.config({ path: `.env.local`, override: true });

connectToMongoDB().then(() => {
    console.log("Connected to MongoDB successfully");
    const app = express();

    // middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(errorHandler);

}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
})


