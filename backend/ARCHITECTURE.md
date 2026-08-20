# 🏗️ Backend Architecture Overview

## Complete Folder Structure

```
tripzy-go-book-main/
│
├── frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── App.tsx
│   └── package.json
│
└── backend (Node.js + Express + MongoDB)
    ├── src/
    │   ├── config/
    │   │   ├── database.js          ← Connect to MongoDB
    │   │   └── constants.js         ← Fixed values (statuses, cities, etc)
    │   │
    │   ├── models/                  ← Database schemas
    │   │   ├── User.js              ← User data structure
    │   │   ├── Bus.js               ← Bus data structure
    │   │   └── Booking.js           ← Booking data structure
    │   │
    │   ├── controllers/             ← Business logic (the "brain")
    │   │   ├── authController.js    ← Register, Login, Profile
    │   │   ├── busController.js     ← Search buses, get details
    │   │   └── bookingController.js ← Create, cancel bookings
    │   │
    │   ├── routes/                  ← API endpoints (URLs)
    │   │   ├── authRoutes.js        ← /api/auth/...
    │   │   ├── busRoutes.js         ← /api/buses/...
    │   │   └── bookingRoutes.js     ← /api/bookings/...
    │   │
    │   ├── middleware/              ← Helper functions
    │   │   ├── auth.js              ← Check JWT token
    │   │   └── errorHandler.js      ← Catch errors
    │   │
    │   └── server.js                ← Main file (starts here)
    │
    ├── seed.js                      ← Add sample data
    ├── package.json                 ← Dependencies
    ├── .env                         ← Secrets (don't share!)
    ├── .env.example                 ← Template for .env
    ├── .gitignore                   ← What to hide from Git
    ├── README.md                    ← Full documentation
    └── SETUP_GUIDE.md               ← Quick setup steps
```

---

## 🔄 How Data Flows

### 1️⃣ **User Registration/Login**

```
Frontend (React)
    ↓ sends email & password
Backend (Express)
    ↓ authController.register()
Database (MongoDB)
    ↓ creates User
Backend (Express)
    ↓ creates JWT token
Frontend (React)
    ↓ receives token, saves it
```

**Files Involved:**

- Frontend: Search form input
- Routes: `POST /api/auth/register`
- Controller: `authController.js`
- Model: `User.js`
- Database: Users collection

---

### 2️⃣ **Search for Buses**

```
Frontend
    ↓ "Delhi to Mumbai, Jan 20"
Backend
    ↓ busController.searchBuses()
Database
    ↓ find matching buses
Backend
    ↓ return 6 buses with details
Frontend
    ↓ show bus list
```

**Files Involved:**

- Routes: `GET /api/buses/search?fromCity=Delhi&toCity=Mumbai&journeyDate=2024-01-20`
- Controller: `busController.searchBuses()`
- Model: `Bus.js`
- Database: Buses collection

---

### 3️⃣ **Book Tickets**

```
Frontend
    ↓ select seats 15, 16
Backend
    ↓ bookingController.createBooking()
    ↓ check if seats available
    ↓ create Booking record
Database
    ↓ save booking
Backend
    ↓ return booking details
Frontend
    ↓ show "Proceed to Payment"
```

**Files Involved:**

- Routes: `POST /api/bookings`
- Controller: `bookingController.createBooking()`
- Model: `Booking.js`, `Bus.js`
- Database: Bookings collection

---

### 4️⃣ **Complete Payment**

```
Frontend
    ↓ payment successful
Backend
    ↓ bookingController.confirmPayment()
    ↓ update booking status to "confirmed"
    ↓ mark seats as booked in bus
Database
    ↓ update Booking
    ↓ update Bus (bookedSeats)
Backend
    ↓ return confirmation
Frontend
    ↓ show booking confirmation
```

**Files Involved:**

- Routes: `POST /api/bookings/confirm-payment`
- Controller: `bookingController.confirmPayment()`
- Models: `Booking.js`, `Bus.js`
- Database: Updates both collections

---

## 🎯 API Endpoints Map

```
/api/auth
├── POST   /register         ← Create account
├── POST   /login            ← Login
├── GET    /profile          ← Get my profile (needs token)
└── PUT    /profile          ← Update profile (needs token)

/api/buses
├── GET    /search           ← Search buses (query params)
├── GET    /all              ← Get all buses
├── GET    /:busId           ← Get bus details
├── GET    /:busId/seats     ← Get available seats
├── POST   /                 ← Create bus (admin)
├── PUT    /:busId           ← Update bus (admin)
└── DELETE /:busId           ← Delete bus (admin)

/api/bookings
├── POST   /                 ← Create booking (needs token)
├── GET    /user/my-bookings ← Get my bookings (needs token)
├── GET    /:bookingId       ← Get booking details (needs token)
├── POST   /confirm-payment  ← Complete payment (needs token)
├── DELETE /:bookingId       ← Cancel booking (needs token)
└── GET    /                 ← Get all bookings (admin, needs token)
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────┐
│         NO TOKEN REQUIRED               │
├─────────────────────────────────────────┤
│ POST   /api/auth/register               │
│ POST   /api/auth/login                  │
│ GET    /api/buses/search                │
│ GET    /api/buses/all                   │
│ GET    /api/buses/:busId                │
│ GET    /api/buses/:busId/seats          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    TOKEN REQUIRED IN HEADER             │
│  Authorization: Bearer <token>          │
├─────────────────────────────────────────┤
│ GET    /api/auth/profile                │
│ PUT    /api/auth/profile                │
│ POST   /api/bookings                    │
│ GET    /api/bookings/user/my-bookings   │
│ GET    /api/bookings/:bookingId         │
│ POST   /api/bookings/confirm-payment    │
│ DELETE /api/bookings/:bookingId         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   ADMIN TOKEN REQUIRED IN HEADER        │
├─────────────────────────────────────────┤
│ POST   /api/buses                       │
│ PUT    /api/buses/:busId                │
│ DELETE /api/buses/:busId                │
│ GET    /api/bookings (all bookings)     │
└─────────────────────────────────────────┘
```

---

## 📊 Database Collections

```
┌──────────────────────────────────────────┐
│           USERS COLLECTION               │
├──────────────────────────────────────────┤
│ _id                    (auto-generated)   │
│ name                   (string)           │
│ email                  (unique string)    │
│ phone                  (string)           │
│ password               (hashed)           │
│ role                   (user/admin)       │
│ createdAt              (date)             │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│            BUSES COLLECTION              │
├──────────────────────────────────────────┤
│ _id                    (auto-generated)   │
│ busName                (string)           │
│ busNumber              (unique string)    │
│ fromCity               (string)           │
│ toCity                 (string)           │
│ departureTime          (string - HH:MM)   │
│ arrivalTime            (string - HH:MM)   │
│ journeyDate            (date)             │
│ price                  (number)           │
│ totalSeats             (number)           │
│ bookedSeats            (array of numbers) │
│ busType                (AC/Sleeper/etc)   │
│ amenities              (array of strings) │
│ rating                 (number 0-5)       │
│ createdAt              (date)             │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          BOOKINGS COLLECTION             │
├──────────────────────────────────────────┤
│ _id                    (auto-generated)   │
│ bookingId              (unique string)    │
│ userId                 (ref to User)      │
│ busId                  (ref to Bus)       │
│ seatNumbers            (array)            │
│ passengerDetails       (array of objects) │
│ totalPrice             (number)           │
│ status                 (pending/confirmed)│
│ paymentStatus          (pending/paid)     │
│ paymentId              (string)           │
│ createdAt              (date)             │
│ updatedAt              (date)             │
└──────────────────────────────────────────┘
```

---

## ⚙️ How Controllers Work

```
busController.searchBuses()
    ↓
1. Get query params: fromCity, toCity, journeyDate
    ↓
2. Validate inputs (make sure all are provided)
    ↓
3. Query database: Bus.find({...filters...})
    ↓
4. Format response
    ↓
5. Send back to frontend (if error, send error message)
```

---

## 🔑 Middleware Functions

### **auth.js (Authentication)**

- Checks if token is provided
- Verifies token is valid
- Extracts user info from token
- Adds user to request object

```
Request with token
    ↓
authMiddleware
    ↓ Validates token
    ↓ Extracts user ID
    ↓ Adds to req.user
    ↓
Continue to controller
```

### **errorHandler.js (Error Handling)**

- Catches all errors
- Formats error messages
- Returns proper error codes (400, 401, 500, etc)

---

## 📝 Example: Complete Booking Process

```
STEP 1: User Login
  POST /api/auth/login → Get JWT token

STEP 2: Search Buses
  GET /api/buses/search?from=Delhi&to=Mumbai&date=2024-01-20
  → Get list of 6 buses

STEP 3: Get Bus Details & Seats
  GET /api/buses/:busId → See all details
  GET /api/buses/:busId/seats → See available seats [1,3,4,6,7,...]

STEP 4: Create Booking (pending)
  POST /api/bookings
  Headers: Authorization: Bearer <token>
  Body: { busId, seatNumbers: [15, 16], totalPrice: 1000 }
  → Get booking ID, status: pending

STEP 5: Process Payment
  (Frontend handles payment with Stripe, PayPal, etc)
  → Get paymentId

STEP 6: Confirm Payment
  POST /api/bookings/confirm-payment
  Headers: Authorization: Bearer <token>
  Body: { bookingId, paymentId }
  → Booking status changes to "confirmed"
  → Seats marked as booked in bus

STEP 7: View Booking
  GET /api/bookings/:bookingId
  Headers: Authorization: Bearer <token>
  → See full booking details with confirmation
```

---

## 🚀 Quick Start Commands

```bash
# Install everything
npm install

# Add sample buses
npm run seed

# Start backend
npm run dev

# Check if running
curl http://localhost:5000/api/health

# Stop backend
Ctrl + C
```

---

## 📚 File Size Overview

| File                 | Lines | Purpose          |
| -------------------- | ----- | ---------------- |
| server.js            | ~60   | Main entry point |
| authController.js    | ~100  | Auth logic       |
| busController.js     | ~140  | Bus logic        |
| bookingController.js | ~180  | Booking logic    |
| User.js              | ~50   | User schema      |
| Bus.js               | ~70   | Bus schema       |
| Booking.js           | ~80   | Booking schema   |
| middleware/          | ~80   | Helper functions |

---

## 🎓 Learning Path

1. **Understand Models** - Database structure
2. **Understand Routes** - What URLs exist
3. **Understand Controllers** - What each URL does
4. **Understand Middleware** - Security & validation
5. **Understand Flow** - How data moves
6. **Test Endpoints** - Use Postman or curl
7. **Connect Frontend** - Make API calls

---

**Ready to start? Follow SETUP_GUIDE.md! 🚀**
