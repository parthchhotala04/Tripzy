import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User
router.post("/", verifyToken, bookingController.createBooking);

router.get("/my", verifyToken, bookingController.getMyBookings);

// Admin
router.get(
  "/admin",
  verifyToken,
  isAdmin,
  bookingController.getAllBookings
);

router.get(
  "/admin/:id",
  bookingController.getBookingByAdmin
);

//user
router.get(
  "/:id",
  verifyToken,
  bookingController.getBooking
);

//cancel
router.put(
  "/:id/cancel",
  verifyToken,
  bookingController.cancelBooking
);


export default router;