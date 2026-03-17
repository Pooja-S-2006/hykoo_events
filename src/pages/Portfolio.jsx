import { useState, useEffect } from 'react';
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

const defaultPortfolioItems = [
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
  const [portfolioItems, setPortfolioItems] = useState(defaultPortfolioItems);

  useEffect(() => {
    // Load uploaded images from localStorage
    const uploadedItems = JSON.parse(localStorage.getItem('portfolioItems') || '[]');
    if (uploadedItems.length > 0) {
      setPortfolioItems([...defaultPortfolioItems, ...uploadedItems]);
    }
  }, []);

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
            subtitle="Explore our finest work and memorable events we've crafted"
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-container">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
