# 🚌 TRIPZY - Backend Server

Backend for the Tripzy bus booking system built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Bus.js               # Bus schema
│   │   └── Booking.js           # Booking schema
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── busController.js     # Bus search & operations
│   │   └── bookingController.js # Booking operations
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── busRoutes.js         # Bus endpoints
│   │   └── bookingRoutes.js     # Booking endpoints
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   └── server.js                # Main server file
├── .env                         # Environment variables
├── .env.example                 # Template for .env
├── .gitignore                   # Git ignore file
└── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Create .env file:**

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your values
```

3. **Configure MongoDB:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get your connection string
   - Add to `.env` as `MONGODB_URI`

### Running the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on: **http://localhost:5000**

---

## 📡 API Endpoints

### **Authentication** (`/api/auth`)

#### Register User

```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123"
}
Response: { token, user }
```

#### Login

```
POST /api/auth/login
Body: {
  "email": "john@gmail.com",
  "password": "password123"
}
Response: { token, user }
```

#### Get Profile

```
GET /api/auth/profile
Headers: Authorization: Bearer <token>
Response: { user }
```

#### Update Profile

```
PUT /api/auth/profile
Headers: Authorization: Bearer <token>
Body: { "name": "Jane Doe", "phone": "9876543211" }
Response: { user }
```

---

### **Buses** (`/api/buses`)

#### Search Buses

```
GET /api/buses/search?fromCity=Delhi&toCity=Mumbai&journeyDate=2024-01-15
Response: { buses: [...] }
```

#### Get All Buses

```
GET /api/buses/all
Response: { buses: [...] }
```

#### Get Bus Details

```
GET /api/buses/:busId
Response: { bus, availableSeats }
```

#### Get Available Seats

```
GET /api/buses/:busId/seats
Response: {
  totalSeats: 40,
  bookedSeats: [1, 2, 5],
  availableSeats: [3, 4, 6, ...],
  availableCount: 37
}
```

#### Create Bus (Admin)

```
POST /api/buses
Headers: Authorization: Bearer <token>
Body: {
  "busName": "Luxury Express",
  "busNumber": "UP-01-AB-1234",
  "operatorName": "Express Travels",
  "fromCity": "DELHI",
  "toCity": "MUMBAI",
  "departureTime": "10:00",
  "arrivalTime": "22:00",
  "journeyDate": "2024-01-15",
  "price": 500,
  "totalSeats": 40,
  "busType": "AC",
  "amenities": ["WiFi", "AC", "USB Charging"]
}
```

---

### **Bookings** (`/api/bookings`)

#### Create Booking

```
POST /api/bookings
Headers: Authorization: Bearer <token>
Body: {
  "busId": "60d5ec49c1234567890abcde",
  "seatNumbers": [15, 16],
  "passengerDetails": [
    {
      "name": "John Doe",
      "age": 25,
      "gender": "Male",
      "phone": "9876543210",
      "email": "john@gmail.com"
    }
  ],
  "totalPrice": 1000
}
Response: { booking, bookingId }
```

#### Get My Bookings

```
GET /api/bookings/user/my-bookings
Headers: Authorization: Bearer <token>
Response: { bookings: [...] }
```

#### Get Booking Details

```
GET /api/bookings/:bookingId
Headers: Authorization: Bearer <token>
Response: { booking }
```

#### Confirm Payment

```
POST /api/bookings/confirm-payment
Headers: Authorization: Bearer <token>
Body: {
  "bookingId": "BK1234567890",
  "paymentId": "PAY123456"
}
Response: { booking (status: confirmed) }
```

#### Cancel Booking

```
DELETE /api/bookings/:bookingId
Headers: Authorization: Bearer <token>
Response: { success: true }
```

#### Get All Bookings (Admin)

```
GET /api/bookings
Headers: Authorization: Bearer <token>
Response: { bookings: [...] }
```

---

## 💾 Database Models

### **User**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date
}
```

### **Bus**

```javascript
{
  _id: ObjectId,
  busName: String,
  busNumber: String (unique),
  operatorName: String,
  fromCity: String,
  toCity: String,
  departureTime: String (HH:MM),
  arrivalTime: String (HH:MM),
  journeyDate: Date,
  price: Number,
  totalSeats: Number,
  bookedSeats: [Number],
  busType: String (AC/Non-AC/Sleeper),
  amenities: [String],
  rating: Number,
  createdAt: Date
}
```

### **Booking**

```javascript
{
  _id: ObjectId,
  bookingId: String (unique),
  userId: ObjectId (ref: User),
  busId: ObjectId (ref: Bus),
  seatNumbers: [Number],
  passengerDetails: [{
    name: String,
    age: Number,
    gender: String,
    phone: String,
    email: String
  }],
  totalPrice: Number,
  status: String (pending/confirmed/cancelled),
  paymentStatus: String (pending/paid/failed),
  paymentId: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**How it works:**

1. User registers/logs in
2. Server returns a JWT token
3. Include token in `Authorization` header: `Bearer <token>`
4. Token expires in 30 days

**Example:**

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." http://localhost:5000/api/auth/profile
```

---

## 📝 Environment Variables

Create a `.env` file in the backend root:

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tripzy

# JWT
JWT_SECRET=your_super_secret_key_change_in_production

# Frontend
FRONTEND_URL=http://localhost:8080
```

**Important:** Never commit `.env` to Git! It's already in `.gitignore`

---

## 🛠️ Development

### Run with auto-reload

```bash
npm run dev
```

### Check if server is running

```bash
curl http://localhost:5000/api/health
```

### Console logs will show:

```
╔══════════════════════════════════════════╗
║  🚌 TRIPZY BACKEND SERVER STARTED        ║
║  Port: 5000                              ║
║  Environment: development                ║
║  URL: http://localhost:5000              ║
╚══════════════════════════════════════════╝
```

---

## 🐛 Common Issues

**"MongoDB Connection Error"**

- Check MONGODB_URI in .env
- Make sure IP is whitelisted in MongoDB Atlas
- Verify internet connection

**"Port 5000 is already in use"**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**"Module not found"**

```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Next Steps

1. **Connect Frontend:**
   - Update frontend API URLs to `http://localhost:5000`
   - Make sure CORS is configured correctly

2. **Add Sample Data:**
   - Use MongoDB Atlas to insert sample buses
   - Test APIs with Postman or curl

3. **Authentication:**
   - Users must register/login before booking
   - Token must be included in protected routes

4. **Deployment:**
   - Deploy backend to Heroku, Vercel, or AWS
   - Update FRONTEND_URL and MONGODB_URI for production

---

## 📚 Testing with Postman

1. **Import the API collection** (if available)
2. **Set up environment variable:**
   - `baseUrl`: http://localhost:5000
   - `token`: (will be set after login)
3. **Test endpoints:** Register → Login → Search Buses → Create Booking

---

## 📞 Support

For issues or questions, create an issue in the repository.

---

**Happy Coding! 🚀🚌**
