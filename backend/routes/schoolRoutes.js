import express from "express";
import { addSchoolHandler, listSchoolsHandler } from "../controllers/schoolController.js";

const router = express.Router();

router.post("/addSchool", addSchoolHandler);
router.get("/listSchools", listSchoolsHandler);

export default router;