import express from "express";
import cors from "cors";
import connectToDB from "./server/DB/mongodb.js";
import profilesRouter from "./server/routes/candidatesProfileRoutes.js";

// Initialize Express app and connect to MongoDB database
const app = express();
await connectToDB;

app.use(
  cors({
    origin: ["https://workotaskbyraj.netlify.app"],
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON bodies
app.use(express.json());

app.use("/candidates", profilesRouter);

// Establish server connection
app.listen(
  5000,
  console.log(`Server started at ${new Date()}. Running on port: 5000`)
);
