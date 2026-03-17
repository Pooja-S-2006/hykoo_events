import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, LogOut, Eye, ArrowRight, Edit2, Save, X, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { api, getAuthHeaders } from '@/config/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('Erode');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserBookings(parsedUser.id, token);
      fetchEnquiryCount(parsedUser.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Listen for enquiry count updates
    const handleEnquiryCountUpdate = (event) => {
      const { userId, count } = event.detail;
      if (user && user.id === userId) {
        setEnquiryCount(count);
      }
    };

    // Listen for booking count updates
    const handleBookingCountUpdate = (event) => {
      const { userId, count } = event.detail;
      if (user && user.id === userId) {
        // Refresh bookings when count is updated
        const token = localStorage.getItem('token');
        fetchUserBookings(userId, token);
      }
    };

    window.addEventListener('enquiryCountUpdated', handleEnquiryCountUpdate);
    window.addEventListener('bookingCountUpdated', handleBookingCountUpdate);
    
    return () => {
      window.removeEventListener('enquiryCountUpdated', handleEnquiryCountUpdate);
      window.removeEventListener('bookingCountUpdated', handleBookingCountUpdate);
    };
  }, [user]);

  const fetchUserBookings = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(api.getUserBookings(userId), {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        // Save booking count to localStorage for persistence
        localStorage.setItem(`bookingCount_${userId}`, data.length.toString());
      } else {
        // Fallback to localStorage or mock data
        const savedBookings = localStorage.getItem(`userBookings_${userId}`);
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings);
          setBookings(bookings);
          localStorage.setItem(`bookingCount_${userId}`, bookings.length.toString());
        } else {
          // Try to get from booking count and create mock data
          const bookingCount = parseInt(localStorage.getItem(`bookingCount_${userId}`) || '0', 10);
          if (bookingCount > 0) {
            // Create mock bookings based on count
            const mockBookings = Array.from({ length: bookingCount }, (_, index) => ({
              _id: `mock-${index + 1}`,
              eventName: `Event ${index + 1}`,
              eventType: 'Service Package',
              bookingDate: new Date().toISOString(),
              eventDate: new Date().toISOString(),
              status: 'confirmed'
            }));
            setBookings(mockBookings);
          } else {
            setBookings([]);
          }
        }
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      
      // Fallback to localStorage or mock data
      const savedBookings = localStorage.getItem(`userBookings_${userId}`);
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        setBookings(bookings);
        localStorage.setItem(`bookingCount_${userId}`, bookings.length.toString());
      } else {
        const bookingCount = parseInt(localStorage.getItem(`bookingCount_${userId}`) || '0', 10);
        if (bookingCount > 0) {
          const mockBookings = Array.from({ length: bookingCount }, (_, index) => ({
            _id: `mock-${index + 1}`,
            eventName: `Event ${index + 1}`,
            eventType: 'Service Package',
            bookingDate: new Date().toISOString(),
            eventDate: new Date().toISOString(),
            status: 'confirmed'
          }));
          setBookings(mockBookings);
        } else {
          setBookings([]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEnquiryCount = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      // For now, get enquiry count from localStorage
      const savedCount = localStorage.getItem(`enquiryCount_${userId}`);
      if (savedCount) {
        setEnquiryCount(parseInt(savedCount, 10));
      } else {
        setEnquiryCount(0);
      }
    } catch (error) {
      console.error('Fetch enquiry count error:', error);
      setEnquiryCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleEditLocation = () => {
    setTempLocation(location);
    setIsEditingLocation(true);
  };

  const handleSaveLocation = () => {
    if (tempLocation.trim()) {
      setLocation(tempLocation.trim());
      setIsEditingLocation(false);
      toast.success('Location updated successfully');
      
      // Here you could also update the user data in the backend
      // updateUserLocation(tempLocation.trim());
    } else {
      toast.error('Location cannot be empty');
    }
  };

  const handleCancelLocation = () => {
    setTempLocation('');
    setIsEditingLocation(false);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header with Profile Dropdown */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-primary font-serif">
                Hykoo Events
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/dashboard" className="text-primary hover:text-primary/80 font-medium">
                  Dashboard
                </Link>
                <Link to="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
                <Link to="/enquiry" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                  {getInitial(user?.name)}
                </div>
                <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 hover:text-primary"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 hover:text-primary"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your event bookings and explore our services
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{bookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{enquiryCount}</p>
                <p className="text-sm text-muted-foreground">Enquiries Sent</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <p className="text-sm text-muted-foreground">Account Status</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  {isEditingLocation ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tempLocation}
                        onChange={(e) => setTempLocation(e.target.value)}
                        className="px-2 py-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                        placeholder="Enter location"
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveLocation()}
                      />
                      <button
                        onClick={handleSaveLocation}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Save"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancelLocation}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-blue-600">{location}</p>
                      <button
                        onClick={handleEditLocation}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit location"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">Your Location</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Bookings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-primary">Recent Bookings</h2>
            <Link
              to="/my-bookings"
              className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">No Bookings Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't booked any events yet. Start exploring our services and book your first event!
              </p>
              <Link to="/services">
                <button className="bg-primary hover:bg-olive-dark text-white px-6 py-3 rounded-lg font-medium">
                  Browse Services
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.slice(0, 6).map((booking) => (
                <div key={booking._id} className="bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elegant transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-primary" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      {booking.eventName}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      Booked on {formatDate(booking.bookingDate)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Confirmed
                      </span>
                      <Link
                        to={`/booking-details/${booking._id}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      >
                        <Eye className="w-4 h-4 ml-1" />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
