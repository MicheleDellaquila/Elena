const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const getMongoURI = () => {
  const dbUsername = process.env.DB_USER || undefined;
  const dbPassword = process.env.DB_PASSWORD || undefined;
  const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.jk3vrqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  return mongoURI;
};

const connectToMongoDB = async () => {
  const mongoURI = getMongoURI();

  try {
    const options = { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } };
    mongoose.connect(mongoURI, options);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

module.exports = connectToMongoDB;
