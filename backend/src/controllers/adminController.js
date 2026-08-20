import User from "../models/User.js";
import Bus from "../models/Bus.js";
import Booking from "../models/Booking.js";

export const getDashboard = async (req, res) => {
    console.log("Dashboard API called");
  console.log(req.user);
    try {
        // Counts
        const totalUsers = await User.countDocuments();
        const totalBuses = await Bus.countDocuments();
        const totalBookings = await Booking.countDocuments();

        // Total Revenue
        const revenue = await Booking.aggregate([
            {
                $match: {
                    status: "Confirmed",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice",
                    },
                },
            },
        ]);

        const totalRevenue =
            revenue.length > 0 ? revenue[0].totalRevenue : 0;

        // Recent Bookings
        const recentBookings = await Booking.find()
            .populate("user", "name")
            .populate("bus", "busName fromCity toCity")
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Buses
        const recentBuses = await Bus.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalBuses,
                totalBookings,
                totalRevenue,
            },
            recentBookings,
            recentBuses,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};