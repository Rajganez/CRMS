import { Router } from "express";
import {
  changeCandidateStatus,
  getCandidatesProfiles,
  removeCandidate,
} from "../controllers/candidatesProfileController.js";

const profilesRouter = Router();

profilesRouter.get("/", getCandidatesProfiles);
profilesRouter.put("/:id/status", changeCandidateStatus);
profilesRouter.delete("/:id", removeCandidate);

export default profilesRouter;
