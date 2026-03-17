# Network Error Fix - Complete Guide

## ✅ **Fixed Issues**

### 1. **CORS Configuration**
- Updated backend CORS to allow specific origins
- Added proper headers for authentication
- Enabled credentials support

### 2. **API Configuration**
- Created centralized API configuration file (`src/config/api.js`)
- All API endpoints now use consistent base URL
- Proper authentication headers management

### 3. **Error Handling**
- Added comprehensive error logging
- Better user feedback messages
- Network error detection and handling

## 🚀 **How to Start the System**

### **Step 1: Start Backend Server**
```bash
cd backend
npm start
```
The backend will start on `http://localhost:5000`

### **Step 2: Start Frontend**
```bash
npm run dev
```
The frontend will start on `http://localhost:5173`

### **Step 3: Test the Connection**
1. Open browser to `http://localhost:5173`
2. Try to signup/login
3. Check browser console for any errors
4. Verify backend is running on port 5000

## 🔧 **Troubleshooting**

### **If you still get "Network error":**

1. **Check Backend Status:**
   - Make sure backend server is running
   - Look for "Connected to MongoDB Atlas" message
   - Check for any error messages in terminal

2. **Check MongoDB Connection:**
   - Verify your MongoDB Atlas connection string
   - Make sure your IP is whitelisted in MongoDB Atlas
   - Check if database name is correct

3. **Check Port Conflicts:**
   - Make sure port 5000 is not in use
   - Try changing PORT in `.env` file if needed

4. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for specific error messages
   - Check Network tab for failed requests

### **Common Solutions:**

**Backend not starting:**
```bash
# Kill any existing process on port 5000
npx kill-port 5000

# Then restart
npm start
```

**CORS issues:**
- The CORS is now configured for localhost:5173
- If using different port, add it to the origin array in `backend/server.js`

**MongoDB connection issues:**
- Verify your MongoDB Atlas credentials
- Check network connectivity
- Ensure database cluster is active

## 📱 **Testing Checklist**

- [ ] Backend starts without errors
- [ ] Frontend builds successfully
- [ ] Can access signup page
- [ ] Can create new account
- [ ] Can login with new account
- [ ] Dashboard loads with user data
- [ ] Can book events from services page
- [ ] Bookings appear in "My Bookings"

## 🎯 **Expected Behavior**

1. **Signup**: Creates user, redirects to login
2. **Login**: Authenticates, stores token, redirects to dashboard
3. **Dashboard**: Shows user info and bookings
4. **Booking**: Stores booking in database, shows success message
5. **My Bookings**: Displays all user bookings with filtering

The network errors should now be resolved with proper CORS configuration and API setup!
