import express from "express";
import { getDashboard } from "../controllers/adminController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  isAdmin,
  getDashboard
);

export default router;