# User Authentication & Booking System Setup

This document explains how to set up and run the complete authentication and booking system for Hykoo Events.

## Backend Setup

### 1. Environment Configuration

Navigate to the `backend` directory and update the `.env` file with your actual credentials:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/hykoo-events?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Additional Dependencies

The frontend already has most dependencies installed. The authentication system uses:

- React Router for navigation
- Lucide React for icons
- Sonner for notifications
- Existing UI components

### 2. Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features Implemented

### Authentication
- ✅ User signup with validation
- ✅ User login with JWT authentication
- ✅ Forgot password with email reset
- ✅ Reset password functionality
- ✅ Protected routes with authentication middleware

### User Dashboard
- ✅ Profile dropdown with user initial
- ✅ Dashboard with booking statistics
- ✅ My Bookings section with filtering
- ✅ Real-time booking data from database

### Event Booking System
- ✅ Connect events to database
- ✅ Store bookings with User ID, Event ID, Event Name, Event Date
- ✅ Booking functionality integrated with existing services
- ✅ Protected booking routes

### Database Collections

#### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  phoneNumber: String (required),
  password: String (required, hashed),
  resetPasswordToken: String,
  resetPasswordExpires: Date
}
```

#### Events Collection
```javascript
{
  eventName: String (required),
  eventDate: Date (required),
  eventDescription: String (required),
  eventImage: String (required)
}
```

#### Bookings Collection
```javascript
{
  userId: ObjectId (ref: 'User', required),
  eventId: ObjectId (ref: 'Event', required),
  eventName: String (required),
  bookingDate: Date (default: Date.now)
}
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Send reset email
- `POST /api/auth/reset-password` - Reset password

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event (admin)

### Bookings
- `POST /api/bookings` - Book an event (protected)
- `GET /api/bookings/user/:userId` - Get user bookings (protected)

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected routes middleware
- ✅ Input validation on frontend and backend
- ✅ Secure password reset with expiration tokens

## How to Use

1. **Setup Backend**: Configure `.env` and start the backend server
2. **Run Frontend**: Start the frontend development server
3. **Register**: Create a new account at `/signup`
4. **Login**: Sign in at `/login`
5. **Browse Events**: View available services at `/services`
6. **Book Events**: Click "Book This Event" on any service
7. **View Bookings**: Check your bookings at `/dashboard` or `/my-bookings`
8. **Manage Profile**: Access profile dropdown from dashboard

## Testing

Test the complete flow:
1. User registration → Login → Dashboard → Book Event → View in My Bookings
2. Password reset → Email reset → New password → Login

The system maintains the existing design and styling while adding comprehensive authentication and booking functionality.
