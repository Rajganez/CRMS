import { Router } from "express";
import { getCandidatesProfiles } from "../controllers/candidatesProfileController.js";

const profilesRouter = Router();

profilesRouter.get("/", getCandidatesProfiles);

export default profilesRouter;
