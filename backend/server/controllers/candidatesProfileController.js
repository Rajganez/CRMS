import { db } from "../DB/mongodb.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

dotenv.config();

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const candidateCollections = db.collection("Ref_Candidates");

// Upload function
export const uploadResumeToS3 = async (file) => {
  try {
    const fileKey = `resumes/${uuidv4()}_${file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const response = await s3.send(command);

    return {
      fileKey,
      url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// Configure Multer for memory storage
const storage = multer.memoryStorage();

export const upload = multer({ storage });

//----------------Add Candidates for Referral--------------------//

export const addCandidatesForReferral = async (req, res) => {
  const { name, email, phone, jobTitle, status } = req.body;
  let resumeUrl = null;

  // Handle file upload to S3 if file is present
  const uploadResult = req.file ? await uploadResumeToS3(req.file) : null;
  if (uploadResult) resumeUrl = uploadResult.url;

  // Create a new candidate object
  const newCandidate = {
    name,
    email,
    phone,
    jobTitle,
    status,
    resumeLink: resumeUrl,
  };

  try {
    // Insert the new candidate document into the database
    const addCandidate = await candidateCollections.insertOne(newCandidate);

    if (addCandidate.insertedId) {
      // Respond with success if candidate is added
      return res.status(201).json({
        message: "Candidate added successfully",
        candidate: newCandidate, // Optionally send the added candidate object
      });
    } else {
      // Handle case where insertion failed
      return res.status(400).json({ message: "Failed to add candidate" });
    }
  } catch (error) {
    console.error("Error adding candidate:", error);
    // Respond with error if something goes wrong
    return res.status(500).json({ message: "Failed to add candidate", error });
  }
};

//--------------------Get Candidates Profile--------------------//

export const getCandidatesProfiles = async (req, res) => {
  try {
    const getProfiles = await candidateCollections.find({}).toArray();
    res.status(200).json(getProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch candidate profiles", error });
  }
};

//------------------Change Candidates Status------------------//

export const changeCandidateStatus = async (req, res) => {
  const { id } = req.params; // Extract candidate ID from the route
  const { status } = req.body; // Extract the new status from the request body

  // Validate the request data
  if (!id || !status) {
    return res
      .status(400)
      .json({ message: "Candidate ID and status are required" });
  }

  const validStatuses = ["Reviewed", "Hired", "Pending"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Allowed statuses are ${validStatuses.join(
        ", "
      )}`,
    });
  }

  try {
    const candidateId = ObjectId.createFromHexString(id);

    // Update the candidate's status in the database
    const result = await candidateCollections.updateOne(
      { _id: candidateId }, // Match the candidate by ID
      { $set: { status } } // Update the status field
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Candidate not found or status unchanged" });
    }

    res.status(200).json({ message: "Candidate status updated successfully" });
  } catch (error) {
    console.error("Error updating candidate status:", error);
    res
      .status(500)
      .json({ message: "Failed to update candidate status", error });
  }
};

//------------------Remove Candidate -----------------------//

export const removeCandidate = async (req, res) => {
  const { id } = req.params; // Extract candidate ID from the route
  if (!id) {
    return res.status(400).json({ message: "Candidate ID is required" });
  }
  try {
    const candidateId = ObjectId.createFromHexString(id);
    const result = await candidateCollections.deleteOne({ _id: candidateId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ message: "Candidate removed successfully" });
  } catch (error) {
    console.error("Error removing candidate:", error);
    res.status(500).json({ message: "Failed to remove candidate", error });
  }
};
