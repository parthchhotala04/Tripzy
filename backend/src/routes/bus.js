import express from "express";
import Bus from "../models/Bus.js";
import City from "../models/City.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const existingBus = await Bus.findOne({
      busNumber: req.body.busNumber,
    });

    if (existingBus) {
      return res.status(400).json({
        success: false,
        message: "Bus Number already exists",
      });
    }

    req.body.availableSeats = req.body.totalSeats;

    const bus = await Bus.create(req.body);

    res.status(201).json({
      success: true,
      message: "Bus Added Successfully",
      bus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get cities from database
router.get("/cities", async (req, res) => {

  const keyword = req.query.keyword || "";

  const cities = await City.find({

    name: {
      $regex: keyword,
      $options: "i"
    }

  })
    .sort({
      popular: -1,
      name: 1
    })
    .limit(10);

  res.json(cities);

});

//get bus through search
router.get("/search", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const buses = await Bus.find({
      fromCity: new RegExp(`^${from}$`, "i"),
      toCity: new RegExp(`^${to}$`, "i"),
      journeyDate: {
        $gte: new Date(date),
        $lt: new Date(
          new Date(date).setDate(new Date(date).getDate() + 1)
        ),
      },
    });

    res.json({
      success: true,
      buses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get all buses
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Buses fetched successfully",
      buses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get single bus
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bus fetched successfully",
      bus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get available seat
router.get("/:id/seats", async (req, res) => {
  try {

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.json({
      success: true,
      availableSeats: bus.availableSeats,
      bookedSeats: bus.bookedSeats,
      totalSeats: bus.totalSeats,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

//update bus
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bus Updated Successfully",
      bus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete bus
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bus Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;