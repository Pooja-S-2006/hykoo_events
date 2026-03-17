const API_BASE_URL = 'http://localhost:5000'; // Use direct URL to avoid proxy issues
const BASE_URL = 'http://localhost:5000'; // Direct URL for fallback

export const api = {
  baseUrl: BASE_URL,
  // Auth endpoints
  login: `${API_BASE_URL}/api/auth/login`,
  signup: `${API_BASE_URL}/api/auth/signup`,
  forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/api/auth/reset-password`,
  checkUser: `${API_BASE_URL}/api/auth/check-user`,
  resetPasswordDirect: `${API_BASE_URL}/api/auth/reset-password-direct`,
  
  // Enquiry endpoints
  submitEnquiry: `${API_BASE_URL}/api/enquiries`,
  
  // Booking endpoints
  bookEvent: `${API_BASE_URL}/api/bookings`,
  getUserBookings: (userId) => `${API_BASE_URL}/api/bookings/user/${userId}`,
  
  // Admin endpoints
  adminEnquiries: `${API_BASE_URL}/api/admin/enquiries`,
  adminBookings: `${API_BASE_URL}/api/admin/bookings`,
  updateEnquiryStatus: (id) => `${API_BASE_URL}/api/admin/enquiries/${id}/status`,
  updateBookingStatus: (id) => `${API_BASE_URL}/api/admin/bookings/${id}/status`,
  
  // Event endpoints
  getEvents: `${API_BASE_URL}/api/events`,
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};
