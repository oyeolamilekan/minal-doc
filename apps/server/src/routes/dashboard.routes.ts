import { createAPIProjectController, deleteAPIProjectController, fetchAPIProjectController, fetchAPIProjectsController, updateAPIProjectController } from "controllers/dashboard.controller";
import express from "express";

const router = express.Router();

router.get("/projects", fetchAPIProjectsController)
router.post("/create_project", createAPIProjectController)
router.delete("/delete_project/:project_id", deleteAPIProjectController)
router.put("/update_project/:project_id", updateAPIProjectController)
router.get("/fetch_project/:project_id", fetchAPIProjectController)

export default router;
