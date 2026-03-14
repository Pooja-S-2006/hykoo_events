import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { X, Check } from 'lucide-react';

import heroWedding from '@/assets/hero-wedding.jpg';
import heroCorporate from '@/assets/hero-corporate.png';
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
    title: 'Puberty Ceremonies',
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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive event solutions tailored to your unique needs"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="group cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                <div className="relative h-72">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{service.description}</p>
                  <button className="mt-4 px-6 py-2 bg-white text-primary rounded-full font-medium text-sm hover:bg-cream transition-colors">
                    View Packages
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Package Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/70" />
              <button
                className="absolute top-4 right-4 text-white hover:text-gold transition-colors"
                onClick={() => setSelectedService(null)}
              >
                <X size={28} />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="font-serif text-3xl font-bold text-white">{selectedService.title}</h2>
                <p className="text-white/80">{selectedService.description}</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-primary mb-6 text-center">Choose Your Package</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {selectedService.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-5 ${
                      index === 1 ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    {index === 1 && (
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-3">
                        Most Popular
                      </span>
                    )}
                    <h4 className="font-semibold text-lg mb-1">{pkg.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-4">{pkg.price}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <a
                  href="/enquiry"
                  className="inline-block px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-olive-dark transition-colors"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
