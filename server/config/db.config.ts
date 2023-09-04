import mongoose from "mongoose";

const DB_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/trackingDB";

async function connectDB(): Promise<void> {
  try {
    console.log(DB_URI)
    await mongoose.connect(DB_URI);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
}

export default connectDB;
