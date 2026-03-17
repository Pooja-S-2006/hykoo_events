import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { X, Check, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { api, getAuthHeaders } from '@/config/api';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroCorporate from '@/assets/hero-corporate.jpg';
import heroBirthday from '@/assets/hero-birthday.webp';
import heroCultural from '@/assets/hero-cultural.jpg';

const services = [
  {
    id: 1,
    title: 'Wedding Celebrations',
    image: heroWedding,
    description: 'Make your special day truly unforgettable with our comprehensive wedding planning services.',
    packages: [
      {
        name: 'Silver Package',
        price: '₹1,50,000',
        features: ['Venue Decoration', 'Stage Setup', 'Basic Lighting', 'Sound System', 'Coordinator on Day'],
      },
      {
        name: 'Gold Package',
        price: '₹3,00,000',
        features: ['Premium Venue Decoration', 'Designer Stage', 'LED Lighting', 'DJ & Sound', 'Full Day Coordination', 'Photography', 'Catering for 200'],
      },
      {
        name: 'Platinum Package',
        price: '₹5,00,000+',
        features: ['Luxury Theme Decoration', 'Custom Stage Design', 'Complete Lighting Package', 'Live Band & DJ', 'Multi-Day Coordination', 'Photo & Video', 'Premium Catering', 'Guest Transportation'],
      },
    ],
  },
  {
    id: 2,
    title: 'Corporate Events',
    image: heroCorporate,
    description: 'Professional event management for conferences, seminars, product launches, and team building activities.',
    packages: [
      {
        name: 'Basic',
        price: '₹75,000',
        features: ['Venue Setup', 'Basic AV Equipment', 'Registration Desk', 'Refreshments'],
      },
      {
        name: 'Professional',
        price: '₹1,50,000',
        features: ['Premium Venue Setup', 'Full AV Package', 'Branding & Signage', 'Catering', 'Event Coordination'],
      },
      {
        name: 'Executive',
        price: '₹3,00,000+',
        features: ['Custom Theme Design', 'LED Walls & Staging', 'Complete Branding', 'Gourmet Catering', 'VIP Management', 'Documentation'],
      },
    ],
  },
  {
    id: 3,
    title: 'Birthday Parties',
    image: heroBirthday,
    description: 'Fun and memorable birthday celebrations for all ages, from kids parties to milestone celebrations.',
    packages: [
      {
        name: 'Fun Pack',
        price: '₹25,000',
        features: ['Balloon Decoration', 'Birthday Cake', 'Games & Activities', 'Return Gifts'],
      },
      {
        name: 'Super Pack',
        price: '₹50,000',
        features: ['Theme Decoration', 'Custom Cake', 'Magic Show/DJ', 'Photography', 'Catering for 50'],
      },
      {
        name: 'Grand Pack',
        price: '₹1,00,000+',
        features: ['Luxury Theme Setup', 'Designer Cake', 'Celebrity/Character Visit', 'Full Photography', 'Premium Catering', 'Party Favors'],
      },
    ],
  },
  {
    id: 4,
    title: 'Cultural Events',
    image: heroCultural,
    description: 'Traditional ceremonies with authentic decorations and services honoring your cultural heritage.',
    packages: [
      {
        name: 'Traditional',
        price: '₹50,000',
        features: ['Traditional Mandap', 'Flower Decoration', 'Basic Setup', 'Priest Arrangement'],
      },
      {
        name: 'Classic',
        price: '₹1,00,000',
        features: ['Decorated Mandap', 'Extensive Florals', 'Traditional Music', 'Complete Setup', 'Coordination'],
      },
      {
        name: 'Royal',
        price: '₹2,00,000+',
        features: ['Designer Mandap', 'Premium Decorations', 'Live Musicians', 'Full Event Management', 'Photography', 'Traditional Catering'],
      },
    ],
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookedPackage, setBookedPackage] = useState(null);
  const [showCustomQuote, setShowCustomQuote] = useState(false);
  const [customQuoteService, setCustomQuoteService] = useState(null);
  const [customQuotedService, setCustomQuotedService] = useState(null);
  const [customQuoteForm, setCustomQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventName: '',
    expectedGuests: '',
    eventDate: '',
    decoration: '',
    catering: '',
    entertainment: '',
    otherRequirements: '',
    budget: ''
  });
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const handlePackageSelect = (packageName) => {
    setSelectedPackage(packageName);
  };

  const handleFixPackage = async () => {
    if (selectedPackage && selectedService) {
      // Find the selected package details
      const packageDetails = selectedService.packages.find(pkg => pkg.name === selectedPackage);
      
      try {
        // Get user data if logged in
        const userData = localStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;
        
        // Submit booking to backend
        const response = await fetch(api.bookEvent, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            userName: user?.name || 'Guest User',
            userEmail: user?.email || 'guest@example.com',
            eventName: selectedService.title,
            eventType: selectedService.title,
            packageName: packageDetails.name,
            packagePrice: packageDetails.price,
            eventDate: new Date().toISOString(), // This should be updated to get actual event date
            location: 'To be determined',
            guests: 0, // This should be updated to get actual guest count
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Save booked package information
          const bookingData = {
            service: selectedService.title,
            package: packageDetails,
            bookingDate: new Date().toISOString(),
            bookingId: data.booking._id
          };
          setBookedPackage(bookingData);
          
          // Update booking count in localStorage
          if (user) {
            const currentCount = parseInt(localStorage.getItem(`bookingCount_${user.id}`) || '0', 10);
            const newCount = currentCount + 1;
            localStorage.setItem(`bookingCount_${user.id}`, newCount.toString());
            
            // Save booking details to localStorage
            const existingBookings = JSON.parse(localStorage.getItem(`userBookings_${user.id}`) || '[]');
            const newBooking = {
              _id: data.booking._id || `booking-${Date.now()}`,
              eventName: selectedService.title,
              eventType: selectedService.title,
              packageName: packageDetails.name,
              packagePrice: packageDetails.price,
              bookingDate: new Date().toISOString(),
              eventDate: new Date().toISOString(),
              location: 'To be determined',
              status: 'confirmed',
              userName: user.name,
              userEmail: user.email
            };
            existingBookings.push(newBooking);
            localStorage.setItem(`userBookings_${user.id}`, JSON.stringify(existingBookings));
            
            // Dispatch custom event to notify other components of the update
            window.dispatchEvent(new CustomEvent('bookingCountUpdated', { 
              detail: { userId: user.id, count: newCount } 
            }));
          }
          
          toast.success(`You have successfully booked the ${selectedPackage}!`);
          setSelectedService(null);
          setSelectedPackage(null);
        } else {
          toast.error(data.message || 'Failed to book package');
        }
      } catch (error) {
        console.error('Booking error:', error);
        
        // Fallback: Still save locally and show success
        const bookingData = {
          service: selectedService.title,
          package: packageDetails,
          bookingDate: new Date().toISOString()
        };
        setBookedPackage(bookingData);
        
        // Update booking count in localStorage (fallback mode)
        if (user) {
          const currentCount = parseInt(localStorage.getItem(`bookingCount_${user.id}`) || '0', 10);
          const newCount = currentCount + 1;
          localStorage.setItem(`bookingCount_${user.id}`, newCount.toString());
          
          // Save booking details to localStorage (fallback mode)
          const existingBookings = JSON.parse(localStorage.getItem(`userBookings_${user.id}`) || '[]');
          const newBooking = {
            _id: `fallback-${Date.now()}`,
            eventName: selectedService.title,
            eventType: selectedService.title,
            packageName: packageDetails.name,
            packagePrice: packageDetails.price,
            bookingDate: new Date().toISOString(),
            eventDate: new Date().toISOString(),
            location: 'To be determined',
            status: 'confirmed',
            userName: user.name,
            userEmail: user.email
          };
          existingBookings.push(newBooking);
          localStorage.setItem(`userBookings_${user.id}`, JSON.stringify(existingBookings));
          
          // Dispatch custom event to notify other components of the update
          window.dispatchEvent(new CustomEvent('bookingCountUpdated', { 
            detail: { userId: user.id, count: newCount } 
          }));
        }
        
        toast.success(`You have successfully booked the ${selectedPackage}!`);
        setSelectedService(null);
        setSelectedPackage(null);
      }
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedPackage(null); // Reset package selection when changing service
  };

  const handleCustomQuote = (service) => {
    setCustomQuoteService(service);
    setShowCustomQuote(true);
    setSelectedService(null); // Close package modal
  };

  const handleCustomQuoteChange = (e) => {
    setCustomQuoteForm({
      ...customQuoteForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCustomQuoteSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!customQuoteForm.name || !customQuoteForm.phone || !customQuoteForm.eventDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (customQuoteForm.eventType === 'Other' && !customQuoteForm.eventName) {
      toast.error('Please enter your custom event name');
      return;
    }

    setIsSubmittingQuote(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Format WhatsApp message
    const message = encodeURIComponent(
      `🎉 *Custom Quote Request - Hykoo Events* 🎉\n\n` +
      `📋 *Service Type:* ${customQuoteService.title}\n` +
      `👤 *Name:* ${customQuoteForm.name}\n` +
      `📧 *Email:* ${customQuoteForm.email || 'Not provided'}\n` +
      `📱 *Phone:* ${customQuoteForm.phone}\n` +
      `🎊 *Event Type:* ${customQuoteForm.eventType}${customQuoteForm.eventType === 'Other' && customQuoteForm.eventName ? ` (${customQuoteForm.eventName})` : ''}\n` +
      `👥 *Expected Guests:* ${customQuoteForm.expectedGuests || 'Not specified'}\n` +
      `📅 *Event Date:* ${customQuoteForm.eventDate}\n` +
      `🎨 *Decoration Requirements:* ${customQuoteForm.decoration || 'Not specified'}\n` +
      `🍽️ *Catering Requirements:* ${customQuoteForm.catering || 'Not specified'}\n` +
      `🎵 *Entertainment Requirements:* ${customQuoteForm.entertainment || 'Not specified'}\n` +
      `💰 *Budget:* ${customQuoteForm.budget || 'Not specified'}\n` +
      `📝 *Other Requirements:* ${customQuoteForm.otherRequirements || 'None'}\n\n` +
      `🌟 *We Empower Your Dreams* 🌟`
    );
    
    // Open WhatsApp with message
    const whatsappNumber = '8124907442';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    toast.success('Opening WhatsApp to send your custom quote request...');
    
    // Save custom quoted service information
    setCustomQuotedService({
      service: customQuoteService.title,
      quoteDetails: { ...customQuoteForm },
      quoteDate: new Date().toISOString()
    });
    
    // Reset form and close modal
    setCustomQuoteForm({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventName: '',
      expectedGuests: '',
      eventDate: '',
      decoration: '',
      catering: '',
      entertainment: '',
      otherRequirements: '',
      budget: ''
    });
    setShowCustomQuote(false);
    setCustomQuoteService(null);
    setIsSubmittingQuote(false);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive event management solutions tailored to your needs"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const isBooked = bookedPackage && bookedPackage.service === service.title;
            const isCustomQuoted = customQuotedService && customQuotedService.service === service.title;
            
            return (
              <div
                key={service.id}
                className={`bg-card rounded-xl shadow-soft border-2 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  isBooked
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                    : isCustomQuoted
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                    : 'border-border'
                }`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {isBooked && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Booked
                    </div>
                  )}
                  {isCustomQuoted && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Quote Requested
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">
                    {service.title}
                  </h3>
                  
                  {isBooked ? (
                    // Show booked package details
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-800">
                            {bookedPackage.package.name}
                          </span>
                          <button
                            onClick={() => setBookedPackage(null)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Clear booking"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-green-600 mb-2">
                          {bookedPackage.package.price}
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Booked {new Date(bookedPackage.bookingDate).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          {bookedPackage.package.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600">
                              <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                          {bookedPackage.package.features.length > 3 && (
                            <div className="text-xs text-green-600 font-medium">
                              +{bookedPackage.package.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-center text-xs text-green-700 font-medium">
                        Our team will contact you soon!
                      </div>
                    </div>
                  ) : isCustomQuoted ? (
                    // Show custom quote details
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-800">
                            Custom Quote Requested
                          </span>
                          <button
                            onClick={() => setCustomQuotedService(null)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Clear quote"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Requested {new Date(customQuotedService.quoteDate).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-600">
                            <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                            Event: {customQuotedService.quoteDetails.eventType}
                            {customQuotedService.quoteDetails.eventType === 'Other' && customQuotedService.quoteDetails.eventName && 
                              ` (${customQuotedService.quoteDetails.eventName})`
                            }
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                            Guests: {customQuotedService.quoteDetails.expectedGuests || 'Not specified'}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                            Date: {customQuotedService.quoteDetails.eventDate}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                            Budget: {customQuotedService.quoteDetails.budget || 'Not specified'}
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-xs text-green-700 font-medium">
                        Custom quote sent! We'll contact you soon.
                      </div>
                    </div>
                  ) : (
                    // Show normal service description
                    <>
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <button
                        onClick={() => handleServiceSelect(service)}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        View Packages
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Package Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-primary">
                  {selectedService.title} Packages
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {selectedService.packages.map((pkg, index) => (
                  <div
                    key={index}
                    onClick={() => handlePackageSelect(pkg.name)}
                    className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedPackage === pkg.name
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : index === 1
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <h4 className="font-semibold text-lg mb-2">{pkg.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {pkg.price}
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {selectedPackage === pkg.name && (
                      <div className="mt-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                          ✓ Selected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleFixPackage}
                  disabled={!selectedPackage}
                  className={`py-3 px-8 rounded-lg transition-colors font-medium ${
                    selectedPackage
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Fix Package
                </button>
                <button
                  onClick={() => handleCustomQuote(selectedService)}
                  className="bg-[#556B2F] hover:bg-[#4A5C28] text-white py-3 px-8 rounded-lg transition-colors font-medium"
                >
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Quote Modal */}
      {showCustomQuote && customQuoteService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    Custom Quote Request
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {customQuoteService.title}
                  </p>
                </div>
                <button
                  onClick={() => setShowCustomQuote(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCustomQuoteSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customQuoteForm.name}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customQuoteForm.email}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customQuoteForm.phone}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="+91 80152 75980"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type</label>
                  <select
                    name="eventType"
                    value={customQuoteForm.eventType}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Team Building">Team Building</option>
                    <option value="Cultural Event">Cultural Event</option>
                    <option value="Religious Ceremony">Religious Ceremony</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="House Warming">House Warming</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {customQuoteForm.eventType === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Name *</label>
                    <input
                      type="text"
                      name="eventName"
                      value={customQuoteForm.eventName}
                      onChange={handleCustomQuoteChange}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter your custom event name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Guests</label>
                  <input
                    type="number"
                    name="expectedGuests"
                    value={customQuoteForm.expectedGuests}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={customQuoteForm.eventDate}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={customQuoteForm.budget}
                    onChange={handleCustomQuoteChange}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="₹50,000 - ₹1,00,000"
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Decoration Requirements</label>
                  <textarea
                    name="decoration"
                    value={customQuoteForm.decoration}
                    onChange={handleCustomQuoteChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Describe your decoration preferences (theme, colors, flowers, lighting, etc.)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Catering Requirements</label>
                  <textarea
                    name="catering"
                    value={customQuoteForm.catering}
                    onChange={handleCustomQuoteChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Food preferences, cuisine type, dietary restrictions, serving style, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Entertainment Requirements</label>
                  <textarea
                    name="entertainment"
                    value={customQuoteForm.entertainment}
                    onChange={handleCustomQuoteChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="DJ, live music, performers, activities, special requests, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Other Requirements</label>
                  <textarea
                    name="otherRequirements"
                    value={customQuoteForm.otherRequirements}
                    onChange={handleCustomQuoteChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Any other special requirements or details we should know about"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCustomQuote(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingQuote}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingQuote ? 'Sending...' : 'Send Quote Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
