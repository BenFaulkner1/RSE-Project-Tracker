import { Router } from "express";
const router = Router();
import {
  validateIdParam,
  validateProjectInput,
} from "../middleware/validationMiddleware.js";

import {
  getAllProjects,
  getProject,
  updateSingleProject,
  deleteProject,
  createProject,
} from "../controllers/projectController.js";

router.route("/").get(getAllProjects).post(validateProjectInput, createProject);
router
  .route("/:id")
  .get(validateIdParam, getProject)
  .patch(validateIdParam, validateProjectInput, updateSingleProject)
  .delete(validateIdParam, deleteProject);

export default router;
