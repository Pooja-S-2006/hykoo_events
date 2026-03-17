import { useState } from 'react';
import { Download, FileText, Calendar, Users, Filter, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const ReportGenerator = ({ 
  data = [], 
  type = 'bookings', 
  title = 'Report',
  users = [],
  onGenerateReport 
}) => {
  const [reportType, setReportType] = useState('overall');
  const [selectedUser, setSelectedUser] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const getUniqueUsers = () => {
    if (type === 'bookings') {
      return [...new Set(data.map(item => item.userEmail || item.userName))].filter(Boolean);
    } else {
      return [...new Set(data.map(item => item.email))].filter(Boolean);
    }
  };

  const getFilteredData = () => {
    let filtered = [...data];

    // Filter by user
    if (reportType === 'individual' && selectedUser) {
      filtered = filtered.filter(item => {
        if (type === 'bookings') {
          return (item.userEmail === selectedUser) || (item.userName === selectedUser);
        } else {
          return item.email === selectedUser;
        }
      });
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case '7days':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          startDate.setDate(now.getDate() - 90);
          break;
        case '1year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(type === 'bookings' ? item.bookingDate : item.date);
        return itemDate >= startDate;
      });
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    return filtered;
  };

  const formatDateForCSV = (dateString) => {
    const date = new Date(dateString);
    // Format as MM/DD/YYYY which is universally recognized by spreadsheet programs
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const generateCSV = (dataToExport) => {
    if (dataToExport.length === 0) {
      toast.error('No data available for the selected criteria');
      return;
    }

    let csvContent = '';
    
    if (type === 'bookings') {
      csvContent = 'Event Name,User Name,Email,Event Type,Booking Date,Event Date,Location,Status,Guests\n';
      csvContent += dataToExport.map(booking => 
        `"${booking.eventName}","${booking.userName}","${booking.userEmail}","${booking.eventType}","${formatDateForCSV(booking.bookingDate)}","${formatDateForCSV(booking.eventDate)}","${booking.location}","${booking.status}","${booking.guests || 0}"`
      ).join('\n');
    } else {
      csvContent = 'Name,Email,Phone,Service,Message,Date,Status\n';
      csvContent += dataToExport.map(enquiry => 
        `"${enquiry.name}","${enquiry.email}","${enquiry.phone}","${enquiry.service}","${enquiry.message.replace(/"/g, '""')}","${formatDateForCSV(enquiry.date)}","${enquiry.status}"`
      ).join('\n');
    }

    return csvContent;
  };

  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      const filteredData = getFilteredData();
      const csvContent = generateCSV(filteredData);
      
      if (csvContent) {
        const timestamp = new Date().toISOString().split('T')[0];
        const reportTitle = reportType === 'individual' 
          ? `${type}-report-${selectedUser.replace(/[^a-z0-9]/gi, '_')}-${timestamp}`
          : `${type}-report-overall-${timestamp}`;
        
        downloadCSV(csvContent, `${reportTitle}.csv`);
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`);
        
        if (onGenerateReport) {
          onGenerateReport({
            type,
            reportType,
            data: filteredData,
            generatedAt: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Report generation error:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getSummaryStats = () => {
    const filtered = getFilteredData();
    
    if (type === 'bookings') {
      const totalGuests = filtered.reduce((sum, booking) => sum + (booking.guests || 0), 0);
      const confirmedCount = filtered.filter(b => b.status === 'confirmed').length;
      const pendingCount = filtered.filter(b => b.status === 'pending').length;
      
      return {
        total: filtered.length,
        totalGuests,
        confirmedCount,
        pendingCount,
        cancelledCount: filtered.filter(b => b.status === 'cancelled').length
      };
    } else {
      const newCount = filtered.filter(e => e.status === 'new').length;
      const contactedCount = filtered.filter(e => e.status === 'contacted').length;
      const inProgressCount = filtered.filter(e => e.status === 'in-progress').length;
      const completedCount = filtered.filter(e => e.status === 'completed').length;
      
      return {
        total: filtered.length,
        newCount,
        contactedCount,
        inProgressCount,
        completedCount
      };
    }
  };

  const stats = getSummaryStats();
  const uniqueUsers = getUniqueUsers();

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
          <p className="text-sm text-muted-foreground">
            Total {type === 'bookings' ? 'Bookings' : 'Enquiries'}
          </p>
        </div>
        
        {type === 'bookings' ? (
          <>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">{stats.confirmedCount}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">{stats.totalGuests}</p>
              <p className="text-sm text-muted-foreground">Total Guests</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">{stats.newCount}</p>
              <p className="text-sm text-muted-foreground">New</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-yellow-600">{stats.contactedCount}</p>
              <p className="text-sm text-muted-foreground">Contacted</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">{stats.completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="overall">Overall Report</option>
                <option value="individual">Individual User</option>
              </select>
            </div>

            {/* User Selection */}
            {reportType === 'individual' && (
              <div>
                <label className="block text-sm font-medium mb-2">Select User</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Choose a user...</option>
                  {uniqueUsers.map((user, index) => (
                    <option key={index} value={user}>{user}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Status Filter</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                {type === 'bookings' ? (
                  <>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </>
                ) : (
                  <>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="text-sm text-muted-foreground">
            <p>Current selection will generate a report for {getFilteredData().length} {type}</p>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating || (reportType === 'individual' && !selectedUser) || data.length === 0}
          className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>{isGenerating ? 'Generating...' : 'Generate CSV Report'}</span>
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;
