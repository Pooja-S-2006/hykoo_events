import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { X } from 'lucide-react';

import heroWedding from '@/assets/hero-wedding.jpg';
import heroCorporate from '@/assets/hero-corporate.jpg';
import heroBirthday from '@/assets/hero-birthday.jpg';
import heroCultural from '@/assets/hero-cultural.jpg';
import serviceBackdrop from '@/assets/service-backdrop.jpg';
import serviceCar from '@/assets/service-car.jpg';
import serviceCatering from '@/assets/service-catering.jpg';
import serviceGarland from '@/assets/service-garland.jpg';

const portfolioItems = [
  { id: 1, image: heroWedding, title: 'Grand Wedding Reception', category: 'Wedding' },
  { id: 2, image: heroCorporate, title: 'Corporate Annual Meet', category: 'Corporate' },
  { id: 3, image: heroBirthday, title: 'Kids Birthday Celebration', category: 'Birthday' },
  { id: 4, image: heroCultural, title: 'Traditional Ceremony', category: 'Cultural' },
  { id: 5, image: serviceBackdrop, title: 'Reception Stage Setup', category: 'Wedding' },
  { id: 6, image: serviceCar, title: 'Bridal Car Decoration', category: 'Wedding' },
  { id: 7, image: serviceCatering, title: 'Gourmet Catering', category: 'Corporate' },
  { id: 8, image: serviceGarland, title: 'Floral Decorations', category: 'Cultural' },
];

const categories = ['All', 'Wedding', 'Corporate', 'Birthday', 'Cultural'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Portfolio"
            subtitle="Explore our gallery of beautifully crafted events and celebrations"
          />
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-primary/80 text-white text-xs rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Event Highlights"
            subtitle="Watch the magic unfold in our event videos"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="relative aspect-video bg-primary/10 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">Wedding Highlights Video</p>
                <p className="text-sm">Coming Soon</p>
              </div>
            </div>
            <div className="relative aspect-video bg-primary/10 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">Corporate Events Reel</p>
                <p className="text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto rounded-xl"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-4 py-1 bg-primary text-white text-sm rounded-full mb-2">
                {selectedImage.category}
              </span>
              <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
