import { Router } from "express";
import {
  addCandidatesForReferral,
  changeCandidateStatus,
  getCandidatesProfiles,
  removeCandidate,
  upload,
} from "../controllers/candidatesProfileController.js";

const profilesRouter = Router();

profilesRouter.get("/", getCandidatesProfiles);
profilesRouter.post("/", upload.single("resume"), addCandidatesForReferral);
profilesRouter.put("/:id/status", changeCandidateStatus);
profilesRouter.delete("/:id", removeCandidate);

export default profilesRouter;
