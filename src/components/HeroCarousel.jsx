import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import heroWedding from '@/assets/hero-wedding.jpg';
import heroCorporate from '@/assets/hero-corporate.jpg';
import heroBirthday from '@/assets/hero-birthday.jpg';
import heroCultural from '@/assets/hero-cultural.jpg';

const slides = [
  {
    image: heroWedding,
    title: 'Dream Weddings',
    subtitle: 'Creating magical moments that last forever',
  },
  {
    image: heroCorporate,
    title: 'Corporate Excellence',
    subtitle: 'Professional events that make an impact',
  },
  {
    image: heroBirthday,
    title: 'Joyful Celebrations',
    subtitle: 'Making occasions truly special',
  },
  {
    image: heroCultural,
    title: 'Puberty Ceremonies',
    subtitle: 'Honoring traditions with elegance',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <p className="text-gold font-medium tracking-widest uppercase mb-4 fade-up">
                We Empower Your Dreams
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 fade-up" style={{ animationDelay: '0.2s' }}>
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up" style={{ animationDelay: '0.3s' }}>
                <Link to="/enquiry" className="btn-hero">
                  Enquiry Now!
                </Link>
                <Link to="/services" className="btn-hero-outline">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
