# 🚀 PRACTICAL EXAMPLE: Add Data in 5 Minutes

## Scenario: Add 5 buses from Delhi to Mumbai on Oct 25

---

## STEP 1️⃣: Open seed.js file

**File Location:** `backend/seed.js`

Open in VS Code and locate the `buses` array. You'll see it looks like this:

```javascript
const seedBuses = async () => {
  try {
    await connectDB();
    await Bus.deleteMany({});

    const buses = [
      {
        busName: "Express Luxury",
        busNumber: "EX-001",
        operatorName: "Express Travels",
        // ... more fields
      },
      // ... more buses
    ];

    // Insert into database
    await Bus.insertMany(buses);
    console.log("✅ Buses added");
  } catch (error) {
    console.error(error);
  }
};
```

---

## STEP 2️⃣: Replace the buses array

Copy and paste this data (5 buses from Delhi to Mumbai):

```javascript
const buses = [
  {
    busName: "Morning Star Express",
    busNumber: "MSE-001",
    operatorName: "Star Travels",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "06:00",
    arrivalTime: "18:00",
    journeyDate: new Date("2025-10-25"),
    price: 450,
    totalSeats: 40,
    busType: "AC",
    amenities: ["WiFi", "AC", "USB Charging", "Water Bottle"],
    rating: 4.5,
    bookedSeats: [5, 10, 15, 20],
  },
  {
    busName: "Afternoon Comfort",
    busNumber: "AC-002",
    operatorName: "Comfort Travels",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "12:00",
    arrivalTime: "00:00",
    journeyDate: new Date("2025-10-25"),
    price: 550,
    totalSeats: 35,
    busType: "Sleeper",
    amenities: ["WiFi", "AC", "Pillow", "Blanket", "USB Charging"],
    rating: 4.7,
    bookedSeats: [3, 7, 25],
  },
  {
    busName: "Evening Budget Ride",
    busNumber: "EBR-003",
    operatorName: "Budget Travels",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "18:00",
    arrivalTime: "06:00",
    journeyDate: new Date("2025-10-25"),
    price: 300,
    totalSeats: 50,
    busType: "Non-AC",
    amenities: ["AC", "USB Charging"],
    rating: 4.0,
    bookedSeats: [1, 2, 3, 4, 5],
  },
  {
    busName: "Night Luxury Express",
    busNumber: "NLE-004",
    operatorName: "Luxury Travels",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "21:00",
    arrivalTime: "09:00",
    journeyDate: new Date("2025-10-25"),
    price: 700,
    totalSeats: 32,
    busType: "Sleeper",
    amenities: ["WiFi", "AC", "USB Charging", "Food Service", "Entertainment"],
    rating: 4.8,
    bookedSeats: [8, 12, 16, 20, 24, 28],
  },
  {
    busName: "Premium Comfort Plus",
    busNumber: "PCP-005",
    operatorName: "Premium Travels",
    fromCity: "DELHI",
    toCity: "MUMBAI",
    departureTime: "10:00",
    arrivalTime: "22:00",
    journeyDate: new Date("2025-10-25"),
    price: 600,
    totalSeats: 40,
    busType: "AC",
    amenities: ["WiFi", "AC", "USB Charging", "Water Bottle", "Snacks"],
    rating: 4.6,
    bookedSeats: [2, 6, 10, 14, 18, 22],
  },
];
```

---

## STEP 3️⃣: Save the file

**Press:** `Ctrl + S` (Windows) or `Cmd + S` (Mac)

---

## STEP 4️⃣: Open Terminal in Backend

**In VS Code:**

- Press: `Ctrl + J` to open Terminal
- Make sure you're in backend folder:

```bash
cd backend
```

---

## STEP 5️⃣: Run the Seed Script

Type this command and press Enter:

```bash
node seed.js
```

**You should see:**

```
✅ MongoDB Connected Successfully!
✅ Buses added to database
```

---

## STEP 6️⃣: Verify Data Added

Go to **MongoDB Atlas:**

1. Open: https://cloud.mongodb.com/
2. Login
3. Click **Databases** → **tripzy**
4. Click **Collections** → **buses**
5. **You should see 5 documents** ✅

---

## STEP 7️⃣: Test in Your App

**Open Frontend:** http://localhost:8081

**Search for buses:**

- From City: `DELHI`
- To City: `MUMBAI`
- Date: `October 25, 2025`

**Click Search**

**Result:** 5 buses should appear! ✅

---

## ✨ WHAT JUST HAPPENED

```
1. You edited seed.js with 5 buses
                ↓
2. You ran: node seed.js
                ↓
3. Script connected to MongoDB
                ↓
4. Deleted old bus data
                ↓
5. Added 5 new buses to database
                ↓
6. Verified in MongoDB Atlas (5 documents)
                ↓
7. Searched in your app (5 buses showed up!)
```

---

## 🎯 NOW TEST THE COMPLETE FLOW

### Test Search:

✅ Open app → Search → See 5 buses

### Test Seat Selection:

✅ Click "Select Seats" → See seat layout with pre-booked seats

### Test Booking:

✅ Select 2-3 seats → Enter details → Confirm → Booking saved to DB!

### Test My Bookings:

✅ Go to "My Bookings" → See your booking! (from database)

---

## 🔄 ADD MORE BUSES LATER

Want to add MORE buses? Just:

1. Edit seed.js
2. Add more bus objects to the array
3. Run: `node seed.js`
4. Done! 🎉

---

## 📝 TEMPLATE FOR MORE BUSES

Copy this template and fill in your data:

```javascript
{
  busName: "YOUR BUS NAME",
  busNumber: "YB-006",
  operatorName: "YOUR COMPANY",
  fromCity: "CITY1",          // UPPERCASE!
  toCity: "CITY2",            // UPPERCASE!
  departureTime: "HH:MM",     // 24-hour format
  arrivalTime: "HH:MM",       // 24-hour format
  journeyDate: new Date("YYYY-MM-DD"),
  price: 500,
  totalSeats: 40,
  busType: "AC",              // or "Sleeper" or "Non-AC"
  amenities: ["WiFi", "AC"],
  rating: 4.5,
  bookedSeats: [5, 10, 15]    // Seat numbers
}
```

---

## 💡 COMMON QUESTIONS

### Q: Can I add buses for different routes?

**A:** Yes! Just change `fromCity` and `toCity`:

```javascript
{
  fromCity: "MUMBAI",
  toCity: "BANGALORE",
  // ... rest of fields
}
```

### Q: What if I make a typo?

**A:** No problem! Just:

1. Fix it in seed.js
2. Run: `node seed.js` again
3. It will replace the old data

### Q: Can I add bookings this way?

**A:** Not recommended. Bookings should be created through the app:

1. User searches bus
2. User selects seats
3. User books → Saved to DB automatically ✅

### Q: How do I add users?

**A:** Users are created when they:

- Register in the app, OR
- Complete their first booking

---

## 🎉 CONGRATS!

You now know how to:
✅ Add buses to MongoDB
✅ Run seed scripts
✅ Verify data in MongoDB Atlas
✅ Test complete flow in your app
✅ Create bookings from the app

**You're ready to build a real bus booking system!** 🚀
