import express from "express";
import {
  createProject,
  updateProject,
  getProject
} from "../controllers/projectController";

const router = express.Router();

router.post("/create", createProject);
router.post("/update", updateProject);
router.get("/get/:projectId", getProject);

export default router;
