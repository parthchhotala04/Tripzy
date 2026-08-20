import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { busId, seatNumbers, passengerDetails } = req.body;

    if (!busId || !seatNumbers || seatNumbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one seat",
      });
    }

    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    const bookedSeats = bus.bookedSeats || [];

    const alreadyBooked = seatNumbers.some((seat) =>
      bookedSeats.includes(seat)
    );

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Some seats are already booked",
      });
    }

    if (bus.availableSeats < seatNumbers.length) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    const totalPrice = seatNumbers.length * bus.fare;

    const booking = await Booking.create({
      user: req.user.id,
      bus: busId,
      seatNumbers,
      passengerDetails,
      totalPrice,
    });

    await booking.populate("bus");

    bus.bookedSeats.push(...seatNumbers);
    bus.availableSeats -= seatNumbers.length;

    await bus.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// User Bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("user", "name email mobile")
.populate(
    "bus",
    "busName busNumber operator fromCity toCity departureTime arrivalTime journeyDate"
)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("bus")
      .sort({ createdAt: -1 });
          


    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("getAllBookings Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
    });
  }
};

// Single Booking
export const getBookingByAdmin = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("bus");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get booking
export const getBooking = async (req, res) => {

  try {

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("bus");

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    res.json({
      success: true,
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

//cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    const bus = await Bus.findById(booking.bus);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // Free seats
    bus.bookedSeats = bus.bookedSeats.filter(
      (seat) => !booking.seatNumbers.includes(seat)
    );

    bus.availableSeats += booking.seatNumbers.length;

    await bus.save();

    booking.status = "Cancelled";

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};