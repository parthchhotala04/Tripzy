import axios from "axios";

const API = axios.create({
  baseURL: "https://tripzy-5vug.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

    //console.log("URL:", config.url);
    //console.log("Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //console.log("Request Headers:", config.headers);

  return config;
});

export default API;

// ================= AUTH =================

export const authAPI = {
  login: async (data: any) => {
    const res = await API.post("/auth/login", data);
    return res.data;
  },

  register: async (data: any) => {
    const res = await API.post("/auth/register", data);
    return res.data;
  },

  profile: async () => {
    const res = await API.get("/auth/profile");
    return res.data;
  },
};

// ================= BUS =================

export const busAPI = {
  searchBus: async (from: string, to: string, date: string) => {

    const res = await API.get("/bus/search", {

      params: {
        from,
        to,
        date
      }

    })

    return res.data

  },

  getBusById: async (id: string) => {
    const res = await API.get(`/bus/${id}`);
    return res.data;
  },

  getAvailableSeats: async (id: string) => {
    const res = await API.get(`/bus/${id}/seats`);
    return res.data;
  },

  // getCities
  getCities: async (keyword: string) => {

    const res = await API.get(
      `/bus/cities?keyword=${keyword}`
    );

    return res.data;

  },

  // Add Bus
  addBus: async (busData: any) => {
    const res = await API.post("/bus/add", busData);
    return res.data;
  },

  // Get All Buses
  getAllBuses: async () => {
    const res = await API.get("/bus");
    return res.data;
  },

  // Delete Bus
  deleteBus: async (id: string) => {
    const res = await API.delete(`/bus/${id}`);
    return res.data;
  },

  // Update Bus
  updateBus: async (id: string, busData: any) => {
    const res = await API.put(`/bus/${id}`, busData);
    return res.data;
  },
};

export const bookingAPI = {
  // Create booking
  createBooking: async (bookingData: {
    busId: string;
    seatNumbers: number[];
    passengerDetails: {
      name: string;
      email: string;
      phone: string;
    };
  }) => {
    const res = await API.post("/booking", bookingData);
    return res.data;
  },

  // Get logged-in user's bookings
  getMyBookings: async () => {
    const res = await API.get("/booking/my");
    return res.data;
  },

  // Get booking by ID
  getBooking: async (bookingId: string) => {
    const res = await API.get(`/booking/${bookingId}`);
    return res.data;
  },

  // Cancel booking
  cancelBooking: async (id: string) => {
    const res = await API.put(`/booking/${id}/cancel`);
    return res.data;
  },

};

// ================= ADMIN BOOKING =================

export const adminBookingAPI = {

  // Get all bookings
  getAllBookings: async () => {

    const res = await API.get("/booking/admin");

    return res.data;

  },

  // Get booking details
  getBooking: async (id: string) => {

    const res = await API.get(`/booking/admin/${id}`);

    return res.data;

  },

};

export const adminAPI = {
  getDashboard: async () => {
    const res = await API.get("/admin/dashboard");
    return res.data;
  },
};

export const cityAPI = {
  getCities: async (search: string) => {
    const res = await API.get(`/cities/search?search=${search}`);
    return res.data;
  },
};
