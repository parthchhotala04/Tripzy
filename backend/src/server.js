import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Imported Routes
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import busRoutes from "./routes/bus.js";
import bookingRoutes from "./routes/booking.js";
import adminRoutes from "./routes/admin.js";
import city from "./routes/city.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes)
app.use("/api/cities", city)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});