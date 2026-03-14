import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const eventTypes = [
  'Weddings',
  'Birthdays',
  'Corporate Events',
  'Cultural Ceremonies',
  'Engagement Parties',
  'Baby Showers',
  'Anniversary Celebrations',
  'Social Gatherings',
];

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="/hykoo-logo.png" alt="Hykoo Events Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Hykoo Events</h3>
                <p className="text-white/80 text-sm italic">We Empower Your Dreams</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Creating unforgettable moments with elegance and precision. Your trusted partner for all celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="footer-link text-sm">Home</Link></li>
              <li><Link to="/about" className="footer-link text-sm">About Us</Link></li>
              <li><Link to="/services" className="footer-link text-sm">Services</Link></li>
              <li><Link to="/portfolio" className="footer-link text-sm">Portfolio</Link></li>
              <li><Link to="/enquiry" className="footer-link text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Event Types */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Events We Handle</h4>
            <ul className="space-y-2">
              {eventTypes.slice(0, 6).map((event) => (
                <li key={event} className="text-white/70 text-sm">{event}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/70 text-sm">6th St, K K Nagar, Bhavani, Lakshmi Nagar, Erode - 638316</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gold" />
                <div className="text-sm">
                  <p className="text-white/70">Santhosh S: +91 8015275980</p>
                  <p className="text-white/70">Parthipan N: +91 8667054735</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gold" />
                <div className="text-sm">
                  <p className="text-white/70">santhoshkhanmech@gmail.com</p>
                  <p className="text-white/70">24partha97@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com/HYKOO-Events"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/hykoo_events"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:santhoshkhanmech@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Hykoo Events. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Owners: <span className="text-white">Santhosh S</span> & <span className="text-white">Parthipan N</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
