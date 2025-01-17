import { db } from "../DB/mongodb.js";
import { ObjectId } from "mongodb";

export const candidateCollections = db.collection("Ref_Candidates");

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
