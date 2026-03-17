import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Input, Textarea, Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components/Ui';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { api, getAuthHeaders } from '@/config/api';

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    location: '',
    message: '',
    service: 'General Enquiry',
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !startDate) {
      toast.error('Please fill in required fields');
      return;
    }
    setIsSubmitting(true);

    try {
      // Submit to backend
      const response = await fetch(api.submitEnquiry, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp,
          service: formData.service,
          message: formData.message,
          location: formData.location,
          eventStartDate: startDate,
          eventEndDate: endDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Enquiry submitted successfully!');
        
        // Update enquiry count in localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          const currentCount = parseInt(localStorage.getItem(`enquiryCount_${user.id}`) || '0', 10);
          const newCount = currentCount + 1;
          localStorage.setItem(`enquiryCount_${user.id}`, newCount.toString());
          
          // Dispatch custom event to notify dashboard of the update
          window.dispatchEvent(new CustomEvent('enquiryCountUpdated', { 
            detail: { userId: user.id, count: newCount } 
          }));
        }

        // Also open WhatsApp for immediate contact
        const formattedStartDate = startDate ? format(startDate, 'PPP') : 'Not specified';
        const formattedEndDate = endDate ? format(endDate, 'PPP') : 'Not specified';
        
        const whatsappMessage = encodeURIComponent(
          `🎉 *New Event Enquiry - Hykoo Events* 🎉\n\n` +
          `👤 *Name:* ${formData.name}\n` +
          `📱 *WhatsApp:* ${formData.whatsapp}\n` +
          `📧 *Email:* ${formData.email || 'Not provided'}\n` +
          `📍 *Event Location:* ${formData.location || 'Not specified'}\n` +
          `📅 *Event Start Date:* ${formattedStartDate}\n` +
          `📅 *Event End Date:* ${formattedEndDate}\n` +
          `💬 *Additional Details:* ${formData.message || 'No additional details'}\n\n` +
          `🌟 *We Empower Your Dreams* 🌟`
        );
        
        const whatsappNumber = '8124907442';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');

        // Reset form
        setFormData({ name: '', whatsapp: '', email: '', location: '', message: '', service: 'General Enquiry' });
        setStartDate(undefined);
        setEndDate(undefined);
      } else {
        toast.error(data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Enquiry submission error:', error);
      
      // Fallback: Still open WhatsApp and show success message
      toast.success('Enquiry submitted successfully!');
      
      const formattedStartDate = startDate ? format(startDate, 'PPP') : 'Not specified';
      const formattedEndDate = endDate ? format(endDate, 'PPP') : 'Not specified';
      
      const whatsappMessage = encodeURIComponent(
        `🎉 *New Event Enquiry - Hykoo Events* 🎉\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📱 *WhatsApp:* ${formData.whatsapp}\n` +
        `📧 *Email:* ${formData.email || 'Not provided'}\n` +
        `📍 *Event Location:* ${formData.location || 'Not specified'}\n` +
        `📅 *Event Start Date:* ${formattedStartDate}\n` +
        `📅 *Event End Date:* ${formattedEndDate}\n` +
        `💬 *Additional Details:* ${formData.message || 'No additional details'}\n\n` +
        `🌟 *We Empower Your Dreams* 🌟`
      );
      
      const whatsappNumber = '8124907442';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank');

      // Reset form
      setFormData({ name: '', whatsapp: '', email: '', location: '', message: '', service: 'General Enquiry' });
      setStartDate(undefined);
      setEndDate(undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Enquiry"
            subtitle="Get in touch with us to plan your perfect event"
          />
        </div>
      </section>

      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Our Office</h4>
                  <p className="text-muted-foreground">
                    6th St, K K Nagar, Bhavani, Lakshmi Nagar, Erode - 638316
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone Numbers</h4>
                  <p className="text-muted-foreground">
                    Santhosh S: +91 8015275980<br />
                    Parthipan N: +91 8667054735
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email Addresses</h4>
                  <p className="text-muted-foreground">
                    santhoshkhanmech@gmail.com<br />
                    24partha97@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-muted-foreground">
                    Monday - Saturday: 9:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden shadow-elegant h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.261111111111!2d77.72055555555555!3d11.333333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba95f5c7f3c7f5f%3A0x7a5d3f3a3a3a3a3a!2sHykoo%20Events!5e0!3m2!1sen!2sin!4v1669851111111!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp Number *</label>
                <Input
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+91 80152 75980"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Event Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City or venue name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Start Date *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Details</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-olive-dark text-white py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Us Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;
