import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
      trim: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    operator: {
      type: String,
      required: true,
      trim: true,
    },

    fromCity: {
      type: String,
      required: true,
      trim: true,
    },

    toCity: {
      type: String,
      required: true,
      trim: true,
    },

    journeyDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
    },

    arrivalTime: {
      type: String,
      required: true,
    },

    busType: {
      type: String,
      required: true,
      enum: [
        "AC Sleeper",
        "AC Seater",
        "Non AC Sleeper",
        "Non AC Seater",
      ],
    },

    fare: {
      type: Number,
      required: true,
      min: 0,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
    type: [Number],
    default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bus", busSchema);

