# 🧪 Backend Testing Guide

## ✅ Backend Status: **RUNNING** 🚀

**URL:** http://localhost:5000

---

## 📊 Test Results

| Test               | Status           | Details                           |
| ------------------ | ---------------- | --------------------------------- |
| **Server Health**  | ✅ Working       | `GET /api/health` returns success |
| **API Structure**  | ✅ Working       | All routes configured             |
| **Error Handling** | ✅ Working       | 404 errors handled properly       |
| **MongoDB**        | ⚠️ Not Connected | Need to configure MongoDB Atlas   |

---

## 🔌 MongoDB Setup (IMPORTANT - Do This Next)

The backend is running but database features won't work until you connect MongoDB. Here's how:

### Step 1: Create MongoDB Atlas Account (Free)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account with Google or email

### Step 2: Create a Free Cluster

1. Click "Create a Project"
2. Name it: `Tripzy`
3. Click "Create a Cluster"
4. Choose:
   - Cloud Provider: AWS
   - Region: `ap-south-1` (India)
   - Cluster Tier: `M0` (Free)
5. Click "Create Cluster"
6. Wait 5-10 minutes ⏳

### Step 3: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Enter:
   - Username: `tripzyuser`
   - Password: `TripzyPass123!`
4. Click "Add User"

### Step 4: Whitelist IP Address

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Clusters"
2. Click "Connect"
3. Click "Connect your application"
4. Copy the connection string
5. Looks like: `mongodb+srv://tripzyuser:TripzyPass123!@cluster.mongodb.net/tripzy?retryWrites=true&w=majority`

### Step 6: Update .env

Edit `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://tripzyuser:TripzyPass123!@cluster.mongodb.net/tripzy?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

### Step 7: Restart Backend

```bash
# Server will restart automatically (Ctrl+C and npm run dev)
# Or just wait for nodemon to detect the change
```

---

## 🧬 Test API Endpoints (Once MongoDB is Connected)

### Test Health Check

```bash
# Using browser:
http://localhost:5000/api/health

# Using curl:
curl http://localhost:5000/api/health
```

### Register New User

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

### Search Buses

```bash
curl "http://localhost:5000/api/buses/search?fromCity=DELHI&toCity=MUMBAI&journeyDate=2024-01-20"
```

### Add Sample Buses

```bash
# Stop the backend first (Ctrl+C)
cd backend
npm run seed
npm run dev
```

---

## 🧑‍💻 Using Postman (Recommended for Testing)

1. Download: https://www.postman.com/downloads/
2. Create a new request
3. Change method to `POST`
4. URL: `http://localhost:5000/api/auth/register`
5. Go to "Body" tab
6. Select "raw" and "JSON"
7. Paste this:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123"
}
```

8. Click "Send"

---

## 📱 Example Responses

### ✅ Health Check (Working)

```json
{
  "success": true,
  "message": "🚀 Backend is running successfully!",
  "timestamp": "2026-07-13T17:09:12.450Z"
}
```

### ❌ Invalid Route

```json
{
  "success": false,
  "message": "Route not found"
}
```

### ⚠️ Database Not Connected

```json
{
  "success": false,
  "message": "Operation `buses.find()` buffering timed out after 10000ms",
  "error": {}
}
```

---

## 📋 Checklist

- [x] Backend server running ✅
- [x] Health endpoint working ✅
- [ ] MongoDB configured ⏳ DO THIS NEXT
- [ ] Sample buses added ⏳
- [ ] User registration tested ⏳
- [ ] Bus search tested ⏳
- [ ] Frontend connected ⏳

---

## 🆘 Troubleshooting

### "Backend connection refused"

- Make sure `npm run dev` is still running
- Check port 5000 is free
- Kill any process on port 5000

### "MongoDB Connection Error"

- Check `.env` file has correct MONGODB_URI
- Verify IP is whitelisted in MongoDB Atlas
- Check username and password are correct

### "Route not found"

- Make sure you're using correct URL: `http://localhost:5000/api/health`
- Not: `http://localhost:8080` (that's frontend port)

---

## 🔗 Quick Links

- **MongoDB Atlas:** https://mongodb.com/cloud/atlas
- **Backend URL:** http://localhost:5000
- **API Documentation:** Read backend/README.md
- **Setup Guide:** Read backend/SETUP_GUIDE.md

---

## 📝 Next Steps

1. **Set up MongoDB Atlas** (most important!)
2. **Add sample data** with `npm run seed`
3. **Test API endpoints** with Postman or curl
4. **Connect frontend** to backend
5. **Deploy** to production

---

**Status:** Backend ready! Just need MongoDB configured. 🎉
