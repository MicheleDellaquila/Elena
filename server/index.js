const dotenv = require("dotenv");
const connectToMongoDB = require("./configs/mongodb");

// Load environment variables from .env.local file
dotenv.config({ path: `.env.local`, override: true });

connectToMongoDB().then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
})


