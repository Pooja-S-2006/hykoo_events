import HeroCarousel from '@/components/HeroCarousel';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';

import heroWedding from '@/assets/hero-wedding.jpg';
import heroCorporate from '@/assets/hero-corporate.jpg';
import heroBirthday from '@/assets/hero-birthday.webp';
import heroCultural from '@/assets/hero-cultural.jpg';
import background from '@/assets/background.webp';
import foreground from '@/assets/foreground.webp';
import ourservices from '@/assets/ourservices.avif';

const services = [
  {
    title: 'Weddings',
    image: heroWedding,
    description: 'Create your dream wedding with our expert planning and execution.',
  },
  {
    title: 'Corporate Events',
    image: heroCorporate,
    description: 'Professional events that leave lasting impressions.',
  },
  {
    title: 'Birthday Celebrations',
    image: heroBirthday,
    description: 'Make every birthday a memorable celebration.',
  },
  {
    title: 'Cultural Ceremonies',
    image: heroCultural,
    description: 'Traditional ceremonies with modern elegance.',
  },
];

// Stats section removed as requested

const Index = () => {
  const navigate = useNavigate();

  const handleNavigateToServices = (serviceTitle) => {
    // Map service titles to categories
    const categoryMap = {
      'Weddings': 'Wedding',
      'Corporate Events': 'Corporate',
      'Birthday Celebrations': 'Birthday',
      'Cultural Ceremonies': 'Cultural'
    };
    
    const category = categoryMap[serviceTitle];
    if (category) {
      navigate('/services');
      sessionStorage.setItem('targetService', category);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel - Grand Indian Wedding/Event Aesthetic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Olive Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${heroWedding})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(78_31%_25%)]/95 via-[hsl(78_31%_33%)]/90 to-[hsl(78_31%_33%)]/80" />
        
        {/* Decorative Gold Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[hsl(40_60%_50%)]/20 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-[hsl(40_60%_50%)]/30 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[hsl(40_60%_50%)]/20 rounded-full animate-pulse delay-500" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Creating Unforgettable Celebrations
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Hykoo Events – Crafting Beautiful Moments for Indian Weddings, Corporate Events and Celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/enquiry"
              className="inline-flex items-center px-12 py-5 bg-[hsl(78_31%_33%)] text-white rounded-full font-semibold text-lg hover:bg-[hsl(78_35%_25%)] transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 border border-[hsl(40_60%_50%)]/30"
            >
              Book Your Event
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center px-12 py-5 bg-transparent text-white border-2 border-[hsl(40_60%_50%)] rounded-full font-semibold text-lg hover:bg-[hsl(40_60%_50%)]/10 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section - Modern Wedding/Event Website Layout */}
      <section className="relative bg-gradient-to-r from-[#F2F5EC] via-[#E8F0E0] to-[#E3EAD7] h-screen overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1200px] h-full flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left Side - Content Area */}
            <div className="order-2 lg:order-1">
              {/* Small Heading */}
              <p className="font-sans text-sm tracking-[0.2em] text-[#3A4D1C] uppercase mb-4">
                PREMIUM EVENT PLANNING SERVICES
              </p>
              
              {/* Olive Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#556B2F] to-transparent w-20 mb-8" />
              
              {/* Main Heading */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#556B2F] mb-8 leading-tight">
                Welcome to Hykoo Events
              </h2>
              
              {/* Description Paragraph */}
              <p className="text-gray-600 text-lg leading-[1.8] mb-10 max-w-lg">
                Hykoo Events is a professional event planning company dedicated to creating memorable celebrations. 
                From traditional weddings to modern corporate events, we bring creativity, elegance, and flawless 
                execution to every occasion. Our experienced team carefully designs each event to reflect your 
                vision while ensuring every detail is handled with perfection.
              </p>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/about"
                  className="inline-block px-[28px] py-[14px] bg-[#556B2F] text-white rounded-lg font-medium text-base hover:bg-[#3A4D1C] transition-all duration-[0.3s] shadow-md hover:shadow-lg"
                >
                  KNOW MORE ABOUT US
                </Link>
              </div>
            </div>
            
            {/* Right Side - Visual Area */}
            <div className="relative order-1 lg:order-2 h-[400px] flex items-center justify-center">
              {/* Background Image (Larger) - Using hero-corporate.jpg */}
              <div className="absolute left-0 top-10 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-xl border-2 border-[#556B2F]/30 z-10">
                <img
                  src={background}
                  alt="Event Setup - Background"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Foreground Image (Smaller, Overlapping) - Using hero-wedding.jpg */}
              <div className="absolute right-0 bottom-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-xl border-2 border-[#C6A75E]/50 z-20">
                <img
                  src={foreground}
                  alt="Event Details - Foreground"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Olive Shapes */}
              <div className="absolute top-0 right-10 w-20 h-20 rounded-full bg-[#556B2F]/10 -z-10" />
              <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-[#3A4D1C]/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section - Background Image Only */}
      <section className="relative h-screen overflow-hidden pt-12 pb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={ourservices}
            alt="Services Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Subtle Gold Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(40_60%_50%)]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(40_60%_50%)]/30 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl md:text-5xl font-light text-white mb-8 relative tracking-wider">
              OUR SERVICES
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[hsl(40_60%_50%)] to-transparent w-1/2" />
            </h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive Event Management Solutions for Every Indian Celebration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {services.map((service, index) => (
              <div key={index} className="group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-[hsl(40_60%_50%)]/30 hover:border-[hsl(40_60%_50%)] hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                {/* Service Image at Top */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(78_31%_33%)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Service Content */}
                <div className="p-8 text-center">
                  
                  <h3 className="font-serif text-xl font-bold text-[hsl(78_31%_33%)] mb-4 group-hover:text-[hsl(40_60%_50%)] transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-[hsl(78_31%_20%)] leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleNavigateToServices(service.title)}
                      className="cursor-pointer hover:scale-110 transition-transform duration-300"
                      title={`View ${service.title} Services`}
                    >
                      <ArrowRight className="w-5 h-5 text-[hsl(78_31%_33%)] group-hover:text-[hsl(40_60%_50%)] transition-colors duration-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/services"
              className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-[hsl(40_60%_50%)] to-[hsl(40_60%_40%)] text-white rounded-full font-semibold text-lg hover:from-[hsl(40_60%_40%)] hover:to-[hsl(40_60%_30%)] transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Our Portfolio Section - Left Text + Right Gallery */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Description */}
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[hsl(78_31%_33%)] mb-4">
                Our Portfolio
              </h2>
              <p className="text-[hsl(78_31%_20%)] text-base leading-relaxed max-w-md">
                Take a look at some of our beautiful wedding and event setups crafted with creativity and elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroWedding})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Ready to Create Your Dream Event?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let us transform your vision into an unforgettable celebration. Contact us today to start planning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enquiry" className="btn-hero bg-white text-primary hover:bg-cream">
              Get Started
            </Link>
            <Link to="/services" className="btn-hero-outline border-white text-white">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
