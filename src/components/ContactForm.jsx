import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Anniversary',
    'Baby Shower',
    'Engagement',
    'Naming Ceremony',
    'Mehendi Ceremony',
    'Cultural Events',
    'Office Party',
    'Bachelorette Party',
    'Sangeet Ceremony',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className={`form-group ${errors.name ? 'error' : ''}`}>
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className={`form-group ${errors.email ? 'error' : ''}`}>
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className={`form-group ${errors.phone ? 'error' : ''}`}>
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className={`form-group ${errors.eventType ? 'error' : ''}`}>
        <label htmlFor="eventType">Event Type *</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
        >
          <option value="">Select event type</option>
          {eventTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        {errors.eventType && <span className="error-message">{errors.eventType}</span>}
      </div>

      <div className={`form-group ${errors.message ? 'error' : ''}`}>
        <label htmlFor="message">Your Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your event..."
          rows="5"
        ></textarea>
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Sending...
          </>
        ) : (
          <>
            <i className="fas fa-paper-plane"></i>
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
