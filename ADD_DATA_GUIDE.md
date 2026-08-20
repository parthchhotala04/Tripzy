# 📊 Complete Guide: Adding Data to MongoDB

## 🎯 Overview

There are **4 methods** to add data to your database:

```
Method 1: Seed Script (Easiest)    ← Recommended for bulk data
Method 2: MongoDB Atlas UI          ← Quick manual addition
Method 3: Backend API (Postman)     ← Test API endpoints
Method 4: Application Frontend      ← User-facing flow
```

---

## ⚡ METHOD 1: SEED SCRIPT (FASTEST - BULK DATA)

### What is Seed?

A seed script automatically inserts sample data into your database. Perfect for testing!

### Step 1: Prepare Your Data

Open `backend/seed.js` and edit the buses array:

```javascript
const buses = [
  {
    busName: "Express Luxury",
    busNumber: "EX-001",
    operatorName: "Express Travels",
    fromCity: "DELHI", // Must be UPPERCASE
    toCity: "MUMBAI", // Must be UPPERCASE
    departureTime: "10:00",
    arrivalTime: "22:00",
    journeyDate: new Date("2025-10-25"), // Future date
    price: 500,
    totalSeats: 40,
    busType: "AC",
    amenities: ["WiFi", "AC", "USB Charging"],
    rating: 4.5,
    bookedSeats: [5, 10, 15], // Pre-booked seats
  },
  {
    busName: "Comfort Journey",
    busNumber: "CJ-002",
    operatorName: "Comfort Travels",
    fromCity: "MUMBAI",
    toCity: "BANGALORE",
    departureTime: "14:00",
    arrivalTime: "02:00",
    journeyDate: new Date("2025-10-25"),
    price: 600,
    totalSeats: 35,
    busType: "Sleeper",
    amenities: ["WiFi", "AC", "Pillow"],
    rating: 4.7,
    bookedSeats: [], // No booked seats yet
  },
];
```

### Step 2: Add More Routes

Add buses for different routes:

```javascript
{
  busName: "Night Express",
  busNumber: "NE-003",
  operatorName: "Night Travels",
  fromCity: "DELHI",
  toCity: "BANGALORE",
  departureTime: "20:00",
  arrivalTime: "08:00",
  journeyDate: new Date("2025-10-26"),
  price: 450,
  totalSeats: 50,
  busType: "Non-AC",
  amenities: ["AC", "USB Charging"],
  rating: 4.2,
  bookedSeats: [1, 2, 20]
}
```

### Step 3: Run the Seed Script

**Open Terminal in backend folder:**

```bash
cd backend
node seed.js
```

**Expected Output:**

```
✅ 5 buses added to database
✅ Connected to MongoDB
✅ Database seeded successfully!
```

**What happens:**

- ✅ Deletes old bus data
- ✅ Inserts new buses
- ✅ All buses ready for searching

### Step 4: Verify Data Added

Go to MongoDB Atlas → Collections → buses → 5 documents should appear

---

## 📱 METHOD 2: MONGODB ATLAS UI (MANUAL)

### Step 1: Open MongoDB Atlas

1. Go to: https://cloud.mongodb.com
2. Login with your account
3. Click on **Databases** → **tripzy** database

### Step 2: Insert Document Manually

1. Click on **Collections**
2. Click on **buses** collection
3. Click **+ Insert Document**

### Step 3: Enter Bus Data

Paste this JSON:

```json
{
  "busName": "Royal Express",
  "busNumber": "RE-007",
  "operatorName": "Royal Travels",
  "fromCity": "DELHI",
  "toCity": "MUMBAI",
  "departureTime": "09:00",
  "arrivalTime": "21:00",
  "journeyDate": {
    "$date": "2025-10-25T00:00:00Z"
  },
  "price": 550,
  "totalSeats": 45,
  "busType": "AC",
  "amenities": ["WiFi", "AC", "USB Charging", "Water Bottle"],
  "rating": 4.6,
  "bookedSeats": [3, 7, 12]
}
```

### Step 4: Click Insert

Your bus is now in the database!

---

## 🔌 METHOD 3: BACKEND API (POSTMAN)

### What You Need

- Postman (Download from https://www.postman.com/downloads/)
- Backend running (`npm run dev`)

### Step 1: Create Bus via Backend

Use this flow if you want to add a bus through an API endpoint.

**Create a new endpoint in backend (optional):**

File: `backend/src/routes/busRoutes.js`

Add this route:

```javascript
// Create new bus (Admin only)
router.post("/", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(201).json({
      success: true,
      message: "Bus added successfully",
      bus: newBus,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
```

### Step 2: Test with Postman

**Open Postman → New Request**

**Method:** `POST`
**URL:** `http://localhost:5000/api/buses`

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "busName": "Postman Test Bus",
  "busNumber": "PM-008",
  "operatorName": "Test Travels",
  "fromCity": "DELHI",
  "toCity": "JAIPUR",
  "departureTime": "11:00",
  "arrivalTime": "16:00",
  "journeyDate": "2025-10-27",
  "price": 400,
  "totalSeats": 40,
  "busType": "AC",
  "amenities": ["WiFi", "AC"],
  "rating": 4.3,
  "bookedSeats": []
}
```

**Click Send**

**Success Response:**

```json
{
  "success": true,
  "message": "Bus added successfully",
  "bus": {
    "_id": "507f1f77bcf86cd799439011",
    "busName": "Postman Test Bus",
    ...
  }
}
```

---

## 👤 METHOD 4: ADD USER DATA

### Through Seed Script

Update `backend/seed.js`:

```javascript
const User = require("./src/models/User");

const seedUsers = async () => {
  try {
    await connectDB();
    await User.deleteMany({});

    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password", // Backend auto-hashes
        phone: "9876543210",
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashed_password",
        phone: "9765432100",
        role: "admin",
      },
    ];

    await User.insertMany(users);
    console.log("✅ Users added");
  } catch (error) {
    console.error(error);
  }
};

// Run both
seedBuses();
seedUsers();
```

### Through API (Registration)

Your app has signup endpoint:

```
POST /api/auth/register
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "password123",
  "phone": "9876543210"
}
```

---

## 💾 METHOD 5: ADD BOOKING DATA

### Automatic (After User Books)

When a user completes a booking through your frontend:

```
1. User selects seats
2. User enters passenger details
3. User clicks "Confirm Booking"
4. Frontend sends POST /api/bookings
5. Backend saves to MongoDB ✅
```

### Manual via Postman

**Method:** `POST`
**URL:** `http://localhost:5000/api/bookings`

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "busId": "507f1f77bcf86cd799439011",
  "seatNumbers": [5, 6, 7],
  "passengerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "totalPrice": 1500
}
```

---

## 🗂️ COMPLETE DATA STRUCTURE

### Bus Document

```javascript
{
  _id: ObjectId,
  busName: String,              // "Express Luxury"
  busNumber: String,            // "EX-001"
  operatorName: String,         // "Express Travels"
  fromCity: String,             // "DELHI" (uppercase!)
  toCity: String,               // "MUMBAI" (uppercase!)
  departureTime: String,        // "10:00" (24-hour format)
  arrivalTime: String,          // "22:00"
  journeyDate: Date,            // new Date("2025-10-25")
  price: Number,                // 500
  totalSeats: Number,           // 40
  busType: String,              // "AC" or "Sleeper" or "Non-AC"
  amenities: [String],          // ["WiFi", "AC", "USB Charging"]
  rating: Number,               // 4.5
  bookedSeats: [Number],        // [5, 10, 15, 20]
  createdAt: Date               // Auto-added by MongoDB
}
```

### User Document

```javascript
{
  _id: ObjectId,
  name: String,                 // "John Doe"
  email: String,                // "john@example.com"
  password: String,             // Hashed password
  phone: String,                // "9876543210"
  role: String,                 // "user" or "admin"
  createdAt: Date               // Auto-added
}
```

### Booking Document

```javascript
{
  _id: ObjectId,
  userId: ObjectId,             // Reference to User
  busId: ObjectId,              // Reference to Bus
  seatNumbers: [Number],        // [5, 6, 7]
  passengerDetails: {
    name: String,               // "John Doe"
    email: String,              // "john@example.com"
    phone: String               // "9876543210"
  },
  totalPrice: Number,           // 1500
  status: String,               // "pending", "confirmed", "completed"
  createdAt: Date               // Auto-added
}
```

---

## 📋 STEP-BY-STEP: ADD 3 SAMPLE BUSES

### Step 1: Edit seed.js

```javascript
// Replace the buses array with this:
const buses = [
  {
    busName: "Morning Express",
    busNumber: "ME-001",
    operatorName: "Express Co",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "07:00",
    arrivalTime: "19:00",
    journeyDate: new Date("2025-10-25"),
    price: 450,
    totalSeats: 40,
    busType: "AC",
    amenities: ["WiFi", "AC"],
    rating: 4.5,
    bookedSeats: [],
  },
  {
    busName: "Afternoon Comfort",
    busNumber: "AC-002",
    operatorName: "Comfort Co",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "14:00",
    arrivalTime: "02:00",
    journeyDate: new Date("2025-10-25"),
    price: 550,
    totalSeats: 35,
    busType: "Sleeper",
    amenities: ["WiFi", "AC", "Pillow"],
    rating: 4.7,
    bookedSeats: [5, 10],
  },
  {
    busName: "Budget Night",
    busNumber: "BN-003",
    operatorName: "Budget Co",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "20:00",
    arrivalTime: "08:00",
    journeyDate: new Date("2025-10-25"),
    price: 300,
    totalSeats: 50,
    busType: "Non-AC",
    amenities: ["AC"],
    rating: 4.0,
    bookedSeats: [1, 2, 3],
  },
];
```

### Step 2: Run Script

```bash
cd backend
node seed.js
```

### Step 3: Verify

- Go to MongoDB Atlas
- Check "buses" collection
- Should see 3 buses

### Step 4: Test in App

1. Open frontend (localhost:8081)
2. Search: From "DELHI" → To "MUMBAI" → Date "2025-10-25"
3. Should see 3 buses!

---

## 🔄 WORKFLOW SUMMARY

```
┌─────────────────────────────────────────────┐
│         ADD DATA TO MONGODB                  │
├─────────────────────────────────────────────┤
│                                              │
│  1. EDIT seed.js with your bus data         │
│     ↓                                        │
│  2. Run: node seed.js                       │
│     ↓                                        │
│  3. Check MongoDB Atlas (data added!)       │
│     ↓                                        │
│  4. Search in frontend (see data!)          │
│     ↓                                        │
│  5. Make a booking (stored in DB!)          │
│     ↓                                        │
│  6. View in "My Bookings" (from DB!)        │
│                                              │
└─────────────────────────────────────────────┘
```

---

## ✅ QUICK CHECKLIST

- [ ] **Add Bus Data:** Edit seed.js with 3-5 buses
- [ ] **Run Seed Script:** `node seed.js`
- [ ] **Verify in Atlas:** Check MongoDB collections
- [ ] **Test Search:** Search from your app
- [ ] **Make Booking:** Complete booking flow
- [ ] **Check Bookings:** See saved data in database

---

## 🆘 TROUBLESHOOTING

| Issue                      | Solution                                           |
| -------------------------- | -------------------------------------------------- |
| "Buses not showing"        | Make sure `fromCity` & `toCity` are UPPERCASE      |
| "No data added"            | Check MongoDB connection - backend must be running |
| "Date format error"        | Use: `new Date("2025-10-25")` format               |
| "Search returns 0 results" | Date must be in future; check city names           |
| "API error 400"            | Check if required fields are present in JSON       |

---

## 🎯 RECOMMENDED APPROACH

**Best Practice for Development:**

1. **Start:** Use `seed.js` to add test buses
2. **Test:** Make bookings through the app
3. **Verify:** Check MongoDB Atlas
4. **Add More:** Edit seed.js, add more buses
5. **Repeat:** As needed

---

**🚀 Now you can add any data you want to MongoDB!**
