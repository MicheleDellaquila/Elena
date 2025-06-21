const { MongoClient, ServerApiVersion } = require("mongodb");

const getMongoURI = () => {
  const dbUsername = process.env.DB_USER || undefined;
  const dbPassword = process.env.DB_PASSWORD || undefined;

  // check if dotenv doesn't load the environment variables
  if (!dbUsername || !dbPassword) return console.error("Database credentials are not set in environment variables.");
  const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.jk3vrqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  return mongoURI;
};

const configureMongoDBClient = () => {
  const mongoURI = getMongoURI();
  const client = new MongoClient(mongoURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
};

const connectToMongoDB = async () => {
  const client = configureMongoDBClient();

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToMongoDB;
