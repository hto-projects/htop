import express from "express";
import {
  createProject,
  updateProject,
  copyProject,
  getProject,
  checkOwnership
} from "../controllers/projectController";
import { protectAllowAnon } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createProject);
router.post("/update", protectAllowAnon, updateProject);
router.post("/copy", copyProject);
router.get("/get/:projectName", getProject);
router.get("/check-ownership/:projectName", protectAllowAnon, checkOwnership);

export default router;
