# 📊 Data Structure Reference Guide

## 🚌 BUS COLLECTION - Complete Field Guide

### What is a Bus Document?

A bus document contains all information about ONE bus journey.

```
Example Bus: "Express Luxury from Delhi to Mumbai"

{
  _id: "507f1f77bcf86cd799439011",     ← Auto-generated ID
  busName: "Express Luxury",            ← Name of the bus
  busNumber: "EX-001",                  ← Bus registration number
  operatorName: "Express Travels",      ← Company operating this bus
  fromCity: "DELHI",                    ← Starting city (UPPERCASE)
  toCity: "MUMBAI",                     ← Destination city (UPPERCASE)
  departureTime: "10:00",               ← When bus leaves (24-hour)
  arrivalTime: "22:00",                 ← When bus arrives (24-hour)
  journeyDate: 2025-10-25T00:00:00Z,   ← Date of journey
  price: 500,                           ← Price per seat in ₹
  totalSeats: 40,                       ← Total seats available
  busType: "AC",                        ← Type: "AC" | "Sleeper" | "Non-AC"
  amenities: ["WiFi", "AC", "USB"],    ← Facilities available
  rating: 4.5,                          ← Customer rating (0-5)
  bookedSeats: [5, 10, 15],            ← Already booked seat numbers
  createdAt: 2025-10-20T12:30:45Z       ← When this entry was created
}
```

---

## 📋 FIELD-BY-FIELD EXPLANATION

| Field         | Type   | Required | Example           | Notes                       |
| ------------- | ------ | -------- | ----------------- | --------------------------- |
| busName       | String | Yes      | "Express Luxury"  | Display name of bus         |
| busNumber     | String | Yes      | "EX-001"          | Unique bus ID (ABC-###)     |
| operatorName  | String | Yes      | "Express Travels" | Company/operator name       |
| fromCity      | String | Yes      | "DELHI"           | **MUST BE UPPERCASE**       |
| toCity        | String | Yes      | "MUMBAI"          | **MUST BE UPPERCASE**       |
| departureTime | String | Yes      | "10:00"           | 24-hour format (HH:MM)      |
| arrivalTime   | String | Yes      | "22:00"           | 24-hour format (HH:MM)      |
| journeyDate   | Date   | Yes      | "2025-10-25"      | **Future date only**        |
| price         | Number | Yes      | 500               | Price per seat              |
| totalSeats    | Number | Yes      | 40                | Total seat count            |
| busType       | String | Yes      | "AC"              | AC, Sleeper, or Non-AC      |
| amenities     | Array  | No       | ["WiFi", "AC"]    | List of features            |
| rating        | Number | No       | 4.5               | Rating 0-5 stars            |
| bookedSeats   | Array  | Yes      | [5, 10, 15]       | Seat numbers already booked |

---

## 👥 USER COLLECTION - Complete Field Guide

### What is a User Document?

A user document contains information about a person who uses the app.

```
{
  _id: "607f1f77bcf86cd799439012",
  name: "John Doe",
  email: "john@example.com",
  password: "$2b$10$encrypted...",    ← Auto-hashed (never store plain)
  phone: "9876543210",
  role: "user",                        ← "user" or "admin"
  createdAt: 2025-10-20T10:30:00Z
}
```

### Field Descriptions

| Field    | Type   | Example            | Notes                      |
| -------- | ------ | ------------------ | -------------------------- |
| name     | String | "John Doe"         | User's full name           |
| email    | String | "john@example.com" | Must be valid email format |
| password | String | "hashed..."        | Auto-hashed by backend     |
| phone    | String | "9876543210"       | 10 digits                  |
| role     | String | "user"             | Either "user" or "admin"   |

---

## 📅 BOOKING COLLECTION - Complete Field Guide

### What is a Booking Document?

A booking contains information about ONE person's bus ticket reservation.

```
{
  _id: "707f1f77bcf86cd799439013",
  userId: "607f1f77bcf86cd799439012",   ← Reference to User
  busId: "507f1f77bcf86cd799439011",    ← Reference to Bus
  seatNumbers: [12, 13, 14],            ← Seats booked
  passengerDetails: {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210"
  },
  totalPrice: 1500,                     ← Total amount paid (price × seats)
  status: "confirmed",                  ← pending | confirmed | completed
  createdAt: 2025-10-20T12:30:45Z
}
```

### Field Descriptions

| Field                  | Type     | Example            | Notes                       |
| ---------------------- | -------- | ------------------ | --------------------------- |
| userId                 | ObjectId | "607f1f77..."      | Links to User collection    |
| busId                  | ObjectId | "507f1f77..."      | Links to Bus collection     |
| seatNumbers            | Array    | [12, 13, 14]       | Array of seat numbers       |
| passengerDetails.name  | String   | "John Doe"         | Passenger name              |
| passengerDetails.email | String   | "john@example.com" | Passenger email             |
| passengerDetails.phone | String   | "9876543210"       | Passenger phone             |
| totalPrice             | Number   | 1500               | price × number of seats     |
| status                 | String   | "confirmed"        | pending/confirmed/completed |

---

## 🔗 RELATIONSHIPS

### How Collections Connect

```
┌─────────────────┐
│   User (1)      │  ← Person makes booking
└────────┬────────┘
         │ userId reference
         ↓
┌─────────────────────┐
│   Booking (Many)    │  ← One user can have many bookings
└────────┬────────────┘
         │ busId reference
         ↓
┌─────────────────┐
│   Bus (Many)    │  ← One user books multiple buses
└─────────────────┘
```

---

## 💾 EXAMPLE COMPLETE DATA

### 1 Bus + 1 User + 1 Booking

**Bus:**

```json
{
  "_id": "6123456789abcdef00000001",
  "busName": "Express Luxury",
  "busNumber": "EX-001",
  "operatorName": "Express Travels",
  "fromCity": "DELHI",
  "toCity": "MUMBAI",
  "departureTime": "10:00",
  "arrivalTime": "22:00",
  "journeyDate": "2025-10-25",
  "price": 500,
  "totalSeats": 40,
  "busType": "AC",
  "amenities": ["WiFi", "AC", "USB Charging"],
  "rating": 4.5,
  "bookedSeats": [5, 10, 15, 20, 25]
}
```

**User:**

```json
{
  "_id": "6123456789abcdef00000002",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$XxXxXxXx...",
  "phone": "9876543210",
  "role": "user"
}
```

**Booking:**

```json
{
  "_id": "6123456789abcdef00000003",
  "userId": "6123456789abcdef00000002",
  "busId": "6123456789abcdef00000001",
  "seatNumbers": [30, 31, 32],
  "passengerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "totalPrice": 1500,
  "status": "confirmed"
}
```

### What This Means:

- User "John Doe" booked 3 seats on "Express Luxury" bus
- Seats: 30, 31, 32
- Total paid: ₹1500 (₹500 × 3 seats)
- Status: confirmed (payment done)
- These seats are now in bus's bookedSeats array

---

## 🎯 DATA VALIDATION RULES

### What Validation Does

Prevents bad/invalid data from entering database.

### Rules

**fromCity & toCity:**

```
✅ VALID: "DELHI", "MUMBAI", "BANGALORE"
❌ INVALID: "delhi", "Delhi", "delhi "
Rule: MUST BE UPPERCASE, NO SPACES
```

**journeyDate:**

```
✅ VALID: new Date("2025-10-25")
❌ INVALID: "2025-10-25" (string), past date
Rule: MUST BE FUTURE DATE, ISO FORMAT
```

**price & totalSeats:**

```
✅ VALID: 500, 40
❌ INVALID: "500", -100, 0
Rule: MUST BE POSITIVE NUMBER
```

**email:**

```
✅ VALID: "john@example.com"
❌ INVALID: "john@example", "john example"
Rule: MUST HAVE @ AND DOMAIN
```

**phone:**

```
✅ VALID: "9876543210"
❌ INVALID: "98765", "+919876543210", "987-654-3210"
Rule: EXACTLY 10 DIGITS
```

**seatNumbers:**

```
✅ VALID: [5, 10, 15]
❌ INVALID: [5.5, 10, "15"], [5, 5, 10] (duplicates)
Rule: ARRAY OF UNIQUE INTEGERS, 0-totalSeats
```

---

## 🔍 MONGODB QUERY EXAMPLES

### Find all buses from Delhi to Mumbai

**What it does:** Search for buses between two cities

```javascript
GET /api/buses/search?fromCity=DELHI&toCity=MUMBAI&journeyDate=2025-10-25
```

**Behind the scenes:**

```javascript
Bus.find({
  fromCity: "DELHI",
  toCity: "MUMBAI",
  journeyDate: { $gte: startDate, $lt: endDate },
});
```

---

### Find available seats on a bus

**What it does:** Show which seats are not booked

```javascript
GET /api/buses/507f1f77bcf86cd799439011/seats
```

**Response:**

```json
{
  "totalSeats": 40,
  "bookedSeats": [5, 10, 15, 20, 25],
  "availableSeats": [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, ...]
}
```

---

### Find user's bookings

**What it does:** Show all bookings for logged-in user

```javascript
GET / api / bookings / my - bookings;
```

**Response:**

```json
{
  "bookings": [
    {
      "_id": "...",
      "busId": { "busName": "Express Luxury", ... },
      "seatNumbers": [30, 31, 32],
      "totalPrice": 1500,
      "status": "confirmed"
    }
  ]
}
```

---

## 🎯 COMMON DATA OPERATIONS

### Operation 1: Add a Bus

```javascript
POST /api/buses
Body: { busName, busNumber, fromCity, toCity, ... }
Result: New bus added, appears in search results
```

### Operation 2: Book Seats

```javascript
POST /api/bookings
Body: { busId, seatNumbers: [30, 31, 32], passengerDetails, totalPrice }
Result:
  - Booking created
  - Bus.bookedSeats updated
  - User data saved
```

### Operation 3: Cancel Booking

```javascript
PUT /api/bookings/:bookingId/cancel
Result:
  - Booking status = "cancelled"
  - Seats freed up in bus
```

### Operation 4: View All Bookings

```javascript
GET /api/bookings/my-bookings
Result: List of all user's bookings with details
```

---

## 📊 SAMPLE DATA FOR TESTING

### 3 Different Routes

**Route 1: Delhi → Mumbai**

- Buses: 5
- Dates: 2025-10-25 to 2025-10-27
- Prices: ₹300 - ₹700

**Route 2: Mumbai → Bangalore**

- Buses: 3
- Dates: 2025-10-26 to 2025-10-28
- Prices: ₹400 - ₹600

**Route 3: Delhi → Jaipur**

- Buses: 4
- Dates: 2025-10-25 to 2025-10-26
- Prices: ₹250 - ₹500

---

## 🆘 ERROR MESSAGES & SOLUTIONS

| Error                     | Cause                                  | Solution                        |
| ------------------------- | -------------------------------------- | ------------------------------- |
| "Buses not found"         | fromCity != toCity OR wrong city names | Check city names are UPPERCASE  |
| "Bus not found"           | Invalid busId                          | Verify busId exists in database |
| "Seats already booked"    | Seat numbers conflict                  | Select different seats          |
| "Invalid email"           | Email format wrong                     | Use format: user@domain.com     |
| "Phone must be 10 digits" | Wrong phone length                     | Enter exactly 10 digits         |

---

## ✅ CHECKLIST: VALID DATA

Before adding data, verify:

- [ ] **fromCity:** UPPERCASE (DELHI, not delhi)
- [ ] **toCity:** UPPERCASE (MUMBAI, not mumbai)
- [ ] **journeyDate:** Future date (2025-10-25, not 2024-10-25)
- [ ] **departureTime:** 24-hour format (10:00, not 10:00 AM)
- [ ] **price:** Positive number (500, not "500")
- [ ] **totalSeats:** Positive number (40, not 0)
- [ ] **busType:** Valid type (AC, Sleeper, or Non-AC)
- [ ] **email:** Valid format (user@example.com)
- [ ] **phone:** 10 digits (9876543210)
- [ ] **bookedSeats:** Array of numbers ([5, 10, 15])

---

**Now you understand the complete data structure! 🎉**
