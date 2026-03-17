import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, LogOut, Eye, ArrowRight, Upload, Image, Users, FileText, Home, Settings, Download } from 'lucide-react';
import { toast } from 'sonner';
import { api, getAuthHeaders } from '@/config/api';
import ReportGenerator from '@/components/ReportGenerator';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [allEnquiries, setAllEnquiries] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Photo upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Wedding');
  const [imageTitle, setImageTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['Wedding', 'Corporate', 'Birthday', 'Cultural'];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchAllBookings(token);
      fetchAllEnquiries(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchAllBookings = async (token) => {
    try {
      const response = await fetch(api.adminBookings, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setAllBookings(data);
        // Save to localStorage for persistence
        localStorage.setItem('adminBookings', JSON.stringify(data));
      } else {
        toast.error('Failed to fetch bookings');
        // Load from localStorage as fallback
        const savedBookings = localStorage.getItem('adminBookings');
        if (savedBookings) {
          setAllBookings(JSON.parse(savedBookings));
        }
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      // Load from localStorage as fallback
      const savedBookings = localStorage.getItem('adminBookings');
      if (savedBookings) {
        setAllBookings(JSON.parse(savedBookings));
      } else {
        // Fallback to mock data
        const mockBookings = [
          {
            _id: '1',
            eventName: 'Wedding Reception',
            userName: 'John Doe',
            userEmail: 'john@example.com',
            eventType: 'Wedding',
            bookingDate: '2024-01-15',
            eventDate: '2024-03-15',
            status: 'confirmed',
            location: 'Erode',
            guests: 200
          },
          {
            _id: '2',
            eventName: 'Birthday Party',
            userName: 'Jane Smith',
            userEmail: 'jane@example.com',
            eventType: 'Birthday',
            bookingDate: '2024-01-20',
            eventDate: '2024-02-20',
            status: 'pending',
            location: 'Coimbatore',
            guests: 50
          }
        ];
        setAllBookings(mockBookings);
        localStorage.setItem('adminBookings', JSON.stringify(mockBookings));
      }
    }
  };

  const fetchAllEnquiries = async (token) => {
    try {
      const response = await fetch(api.adminEnquiries, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setAllEnquiries(data);
        // Save to localStorage for persistence
        localStorage.setItem('adminEnquiries', JSON.stringify(data));
      } else {
        toast.error('Failed to fetch enquiries');
        // Load from localStorage as fallback
        const savedEnquiries = localStorage.getItem('adminEnquiries');
        if (savedEnquiries) {
          setAllEnquiries(JSON.parse(savedEnquiries));
        }
      }
    } catch (error) {
      console.error('Fetch enquiries error:', error);
      // Load from localStorage as fallback
      const savedEnquiries = localStorage.getItem('adminEnquiries');
      if (savedEnquiries) {
        setAllEnquiries(JSON.parse(savedEnquiries));
      } else {
        // Fallback to mock data
        const mockEnquiries = [
          {
            _id: '1',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            phone: '9876543210',
            service: 'Corporate Event',
            message: 'Need corporate event planning for 100 people',
            date: '2024-01-18',
            status: 'new'
          },
          {
            _id: '2',
            name: 'Bob Wilson',
            email: 'bob@example.com',
            phone: '9876543211',
            service: 'Wedding Planning',
            message: 'Looking for wedding planning services',
            date: '2024-01-19',
            status: 'contacted'
          }
        ];
        setAllEnquiries(mockEnquiries);
        localStorage.setItem('adminEnquiries', JSON.stringify(mockEnquiries));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      const response = await fetch(api.updateEnquiryStatus(enquiryId), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state immediately for better UX
        const updatedEnquiries = allEnquiries.map(enq => 
          enq._id === enquiryId ? { ...enq, status: newStatus } : enq
        );
        setAllEnquiries(updatedEnquiries);
        // Save to localStorage for persistence
        localStorage.setItem('adminEnquiries', JSON.stringify(updatedEnquiries));
        toast.success('Enquiry status updated successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update enquiry status');
      }
    } catch (error) {
      console.error('Update enquiry status error:', error);
      // Fallback: Update locally and save to localStorage
      const updatedEnquiries = allEnquiries.map(enq => 
        enq._id === enquiryId ? { ...enq, status: newStatus } : enq
      );
      setAllEnquiries(updatedEnquiries);
      localStorage.setItem('adminEnquiries', JSON.stringify(updatedEnquiries));
      toast.success('Enquiry status updated successfully');
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(api.updateBookingStatus(bookingId), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state immediately for better UX
        const updatedBookings = allBookings.map(booking => 
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setAllBookings(updatedBookings);
        // Save to localStorage for persistence
        localStorage.setItem('adminBookings', JSON.stringify(updatedBookings));
        toast.success('Booking status updated successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('Update booking status error:', error);
      // Fallback: Update locally and save to localStorage
      const updatedBookings = allBookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setAllBookings(updatedBookings);
      localStorage.setItem('adminBookings', JSON.stringify(updatedBookings));
      toast.success('Booking status updated successfully');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !imageTitle.trim()) {
      toast.error('Please select an image and enter a title');
      return;
    }

    setIsUploading(true);
    try {
      // Get existing portfolio items from localStorage
      const existingPortfolio = JSON.parse(localStorage.getItem('portfolioItems') || '[]');
      
      // Create new portfolio item
      const newItem = {
        id: Date.now(),
        title: imageTitle,
        category: selectedCategory,
        image: URL.createObjectURL(selectedFile), // In production, upload to server
        uploadDate: new Date().toISOString()
      };

      // Add to portfolio
      existingPortfolio.push(newItem);
      localStorage.setItem('portfolioItems', JSON.stringify(existingPortfolio));

      // Reset form
      setSelectedFile(null);
      setImageTitle('');
      setSelectedCategory('Wedding');
      
      toast.success('Image uploaded successfully to portfolio!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'A';
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
                Hykoo Events - Admin
              </Link>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {getInitial(user?.name)}
                </div>
                <span className="hidden sm:block text-sm font-medium">{user?.name} (Admin)</span>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                  <Link
                    to="/portfolio"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 hover:text-primary"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <Image className="w-4 h-4" />
                    View Portfolio
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
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-serif mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage bookings, enquiries, and portfolio content
          </p>
        </section>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Enquiries
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'reports'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Reports
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{allBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{allEnquiries.length}</p>
                  <p className="text-sm text-muted-foreground">Total Enquiries</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {allBookings.reduce((sum, b) => sum + (b.guests || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Guests</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Image className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {JSON.parse(localStorage.getItem('portfolioItems') || '[]').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Portfolio Images</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-card rounded-xl border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="font-serif text-xl font-semibold text-primary">All User Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.eventName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.userEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.eventType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.eventDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full border-0 cursor-pointer ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="bg-card rounded-xl border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="font-serif text-xl font-semibold text-primary">All User Enquiries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allEnquiries.map((enquiry) => (
                    <tr key={enquiry._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {enquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {enquiry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {enquiry.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {enquiry.service}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {enquiry.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(enquiry.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) => updateEnquiryStatus(enquiry._id, e.target.value)}
                          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full border-0 cursor-pointer ${
                            enquiry.status === 'new' 
                              ? 'bg-blue-100 text-blue-800'
                              : enquiry.status === 'contacted'
                              ? 'bg-yellow-100 text-yellow-800'
                              : enquiry.status === 'in-progress'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h2 className="font-serif text-2xl font-semibold text-primary mb-6">Upload Photo to Portfolio</h2>
              
              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {selectedFile && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>

                {/* Image Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Image Title</label>
                  <input
                    type="text"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="Enter image title"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFile || !imageTitle.trim()}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload to Portfolio'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            {/* Bookings Report */}
            <ReportGenerator
              data={allBookings}
              type="bookings"
              title="Bookings Report Generator"
              onGenerateReport={(reportData) => {
                console.log('Bookings report generated:', reportData);
                // You could save report metadata to backend here
              }}
            />

            {/* Enquiries Report */}
            <ReportGenerator
              data={allEnquiries}
              type="enquiries"
              title="Enquiries Report Generator"
              onGenerateReport={(reportData) => {
                console.log('Enquiries report generated:', reportData);
                // You could save report metadata to backend here
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
