import { db } from "../DB/mongodb.js";

export const candidateCollections = db.collection("Ref_Candidates");

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
