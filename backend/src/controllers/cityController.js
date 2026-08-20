import City from "../models/City.js";

const searchCities = async (req, res) => {
  try {
    const search = req.query.search || "";

    const cities = await City.find({
      name: {
        $regex: search,
        $options: "i",
      },
    })
      .sort({ name: 1 })
      .limit(8);

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  searchCities,
};