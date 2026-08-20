# 🚀 Backend Setup Guide - Simple Steps

## ✅ Step 1: Prerequisites (What You Need)

- ✓ Node.js installed
- ✓ MongoDB Atlas account (Free tier is fine)
- ✓ Terminal/Command Prompt
- ✓ Code Editor (VS Code recommended)

---

## 📋 Step 2: Create MongoDB Atlas Database

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** (it's free)
3. **Click "Create a Cluster"**
4. **Choose:**
   - Cloud Provider: AWS
   - Region: Closest to you
   - Click "Create"
5. **Wait 5-10 minutes** for cluster to be created
6. **Create a Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `tripzyuser`
   - Password: `TripzyPass123!` (remember this)
   - Click "Add User"
7. **Add IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
8. **Get Connection String:**
   - Go back to "Clusters"
   - Click "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://tripzyuser:password@cluster.mongodb.net/tripzy?retryWrites=true&w=majority`

---

## 🔧 Step 3: Configure Backend

### Open Terminal in `backend` folder

```bash
# Navigate to backend
cd backend
```

### Create `.env` file

The `.env` file already exists. Edit it with your MongoDB details:

```
# .env file
PORT=5000
MONGODB_URI=mongodb+srv://tripzyuser:TripzyPass123!@cluster.mongodb.net/tripzy?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_key_12345
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

**⚠️ Replace:**

- `tripzyuser` with your MongoDB username
- `TripzyPass123!` with your password
- Everything after `@` with your connection string

---

## 📦 Step 4: Install Dependencies

```bash
npm install
```

This installs all required packages (express, mongoose, etc.)

---

## 🌱 Step 5: Add Sample Data (Optional but Recommended)

```bash
node seed.js
```

This adds 6 sample buses to your database for testing.

---

## ▶️ Step 6: Run Backend Server

```bash
npm run dev
```

**You should see:**

```
╔══════════════════════════════════════════╗
║  🚌 TRIPZY BACKEND SERVER STARTED        ║
║  Port: 5000                              ║
║  Environment: development                ║
║  URL: http://localhost:5000              ║
╚══════════════════════════════════════════╝
```

**Keep this terminal open!**

---

## ✅ Step 7: Verify Backend is Working

Open a new terminal and run:

```bash
curl http://localhost:5000/api/health
```

**Response should be:**

```json
{
  "success": true,
  "message": "🚀 Backend is running successfully!",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🧪 Step 8: Test API Endpoints (Optional)

### Using Postman (Easy):

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Test endpoints (see examples below)

### Using curl (Command line):

**Search Buses:**

```bash
curl "http://localhost:5000/api/buses/search?fromCity=DELHI&toCity=MUMBAI&journeyDate=2024-01-20"
```

**Register User:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@gmail.com",
    "phone": "9876543210",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

---

## 🎯 Common Commands

```bash
# Start backend (with auto-reload)
npm run dev

# Start backend (production)
npm start

# Add sample buses to database
node seed.js

# Check health
curl http://localhost:5000/api/health

# Install missing packages
npm install

# Stop backend
Press Ctrl + C
```

---

## 🔑 Important Environment Variables

| Variable       | What it does            | Example                       |
| -------------- | ----------------------- | ----------------------------- |
| `PORT`         | Server port             | `5000`                        |
| `MONGODB_URI`  | Database connection     | MongoDB Atlas URL             |
| `JWT_SECRET`   | Secret key for logins   | Any random string             |
| `NODE_ENV`     | Environment type        | `development` or `production` |
| `FRONTEND_URL` | Frontend URL (for CORS) | `http://localhost:8080`       |

---

## 🛠️ Troubleshooting

### ❌ "Cannot find module 'express'"

```bash
npm install
```

### ❌ "MongoDB Connection Error"

- Check MONGODB_URI in .env
- Make sure IP is whitelisted in MongoDB Atlas
- Check username and password

### ❌ "Port 5000 is already in use"

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### ❌ "JWT error" after login

- Make sure JWT_SECRET is set in .env
- Token is included in Authorization header: `Bearer <token>`

### ❌ CORS error (Frontend can't reach Backend)

- Check FRONTEND_URL in .env matches your frontend URL
- Make sure backend is running on port 5000

---

## 📚 Folder Structure Explained

```
backend/
├── src/
│   ├── config/          👈 Settings (database, constants)
│   ├── models/          👈 Data schemas (User, Bus, Booking)
│   ├── controllers/     👈 Business logic (what to do)
│   ├── routes/          👈 API URLs
│   ├── middleware/      👈 Helper functions (auth, errors)
│   └── server.js        👈 Main file (start here)
├── seed.js              👈 Add sample data
├── .env                 👈 Secret keys (don't share!)
├── package.json         👈 Dependencies list
└── README.md            👈 Full documentation
```

---

## 🚀 Next: Connect Frontend to Backend

In your React frontend files, update API calls to:

```javascript
const API_URL = "http://localhost:5000/api";

// Example
const response = await fetch(`${API_URL}/buses/search?...`);
```

---

## 📞 Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string copied
- [ ] `.env` file updated
- [ ] Dependencies installed (`npm install`)
- [ ] Sample data added (`node seed.js`)
- [ ] Backend running (`npm run dev`)
- [ ] Health check works (`curl http://localhost:5000/api/health`)
- [ ] Frontend updated to use backend URL

---

## 🎓 What Each Part Does

- **Models** = Database structure (like a blueprint)
- **Controllers** = Logic (what to do with data)
- **Routes** = URLs (where to access features)
- **Middleware** = Security & validation
- **Config** = Settings & constants

---

**Congratulations! Your backend is ready! 🎉**

Next: Connect it to your React frontend and start building! 🚀
