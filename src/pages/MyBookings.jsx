import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Eye, ArrowRight, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { api, getAuthHeaders } from '@/config/api';

const MyBookings = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserBookings(parsedUser.id);
    } else {
      navigate('/login');
    }

    // Listen for booking count updates
    const handleBookingCountUpdate = (event) => {
      if (user && event.detail.userId === user.id) {
        // Refresh bookings when count is updated
        fetchUserBookings(user.id);
      }
    };

    window.addEventListener('bookingCountUpdated', handleBookingCountUpdate);

    return () => {
      window.removeEventListener('bookingCountUpdated', handleBookingCountUpdate);
    };
  }, [navigate, user]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(booking => {
        const bookingDate = new Date(booking.bookingDate);
        const today = new Date();
        
        if (filter === 'upcoming') {
          return bookingDate >= today;
        } else if (filter === 'past') {
          return bookingDate < today;
        }
        return true;
      });
      setFilteredBookings(filtered);
    }
  }, [bookings, filter]);

  const fetchUserBookings = async (userId) => {
    try {
      const response = await fetch(api.getUserBookings(userId), {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        // Save to localStorage for persistence
        localStorage.setItem(`userBookings_${userId}`, JSON.stringify(data));
        localStorage.setItem(`bookingCount_${userId}`, data.length.toString());
      } else {
        toast.error('Failed to fetch bookings');
        // Load from localStorage as fallback
        const savedBookings = localStorage.getItem(`userBookings_${userId}`);
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings);
          setBookings(bookings);
          localStorage.setItem(`bookingCount_${userId}`, bookings.length.toString());
        }
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      // Load from localStorage as fallback
      const savedBookings = localStorage.getItem(`userBookings_${userId}`);
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        setBookings(bookings);
        localStorage.setItem(`bookingCount_${userId}`, bookings.length.toString());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (bookingDate) => {
    const date = new Date(bookingDate);
    const today = new Date();
    
    if (date >= today) {
      return 'bg-green-100 text-green-700';
    } else {
      return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (bookingDate) => {
    const date = new Date(bookingDate);
    const today = new Date();
    
    if (date >= today) {
      return 'Upcoming';
    } else {
      return 'Completed';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-primary font-serif">
                Hykoo Events
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/my-bookings" className="text-primary hover:text-primary/80 font-medium">
                  My Bookings
                </Link>
                <Link to="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
                <Link to="/enquiry" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">My Bookings</h1>
          <p className="text-muted-foreground text-lg">
            View and manage all your event bookings
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'upcoming'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'past'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                }`}
              >
                Past
              </button>
            </div>
          </div>
        </section>

        {/* Bookings Grid */}
        <section>
          {filteredBookings.length === 0 ? (
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                No {filter === 'all' ? '' : filter} Bookings Found
              </h3>
              <p className="text-muted-foreground mb-6">
                {filter === 'all' 
                  ? "You haven't booked any events yet. Start exploring our services!"
                  : `You have no ${filter} bookings.`
                }
              </p>
              <Link to="/services">
                <button className="bg-primary hover:bg-olive-dark text-white px-6 py-3 rounded-lg font-medium">
                  Browse Services
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elegant transition-shadow">
                  {/* Event Image */}
                  <div className="h-48 relative">
                    {booking.eventId?.eventImage ? (
                      <img
                        src={booking.eventId.eventImage}
                        alt={booking.eventName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-primary" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.bookingDate)}`}>
                        {getStatusText(booking.bookingDate)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Booking Details */}
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      {booking.eventName}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Booked: {formatDate(booking.bookingDate)}</span>
                      </div>
                      
                      {booking.eventId?.eventDate && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>Event: {formatDate(booking.eventId.eventDate)}</span>
                        </div>
                      )}
                      
                      {booking.eventId?.eventDescription && (
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{booking.eventId.eventDescription}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Link
                        to={`/booking-details/${booking._id}`}
                        className="flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
                      
                      <Link
                        to={`/services`}
                        className="flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Book Again
                        <ArrowRight className="w-4 h-4 ml-1" />
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

export default MyBookings;
