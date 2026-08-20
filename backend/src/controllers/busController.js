import Bus from "../models/Bus.js";

export const addBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);

    res.status(201).json({
      success: true,
      bus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();

    res.json({
      success: true,
      buses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    res.json({
      success: true,
      bus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      bus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Bus deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};