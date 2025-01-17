import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Load Environment Variables
const DB_USER = process.env.DB_USER_NAME;
const DB_PASS = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;

// Get the MongoDB connection strings from environment variables
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=workotask`;

// Create a new MongoClient instance and connect to the MongoDB database
const client = new MongoClient(uri);

// Get the database name from environment variable
const db = client.db(process.env.DB_NAME);

// Function to connect to MongoDB database
const connectToDB = async () => {
    try {
      await client.connect();
      console.log("Connected to MongoDB...");
    } catch (error) {
      console.log("Error connecting to MongoDB", error);
      process.exit(1);
    }
  };
  
  export default connectToDB;
  export { db };