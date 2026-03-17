import SectionTitle from '@/components/SectionTitle';

import serviceBackdrop from '@/assets/backdrop.webp';
import serviceFlex from '@/assets/service-flex.png';
import serviceCar from '@/assets/service-car.png';
import serviceCatering from '@/assets/service-catering.png';
import servicePandhal from '@/assets/service-pandhal.jpg';
import serviceGarland from '@/assets/service-garland.jpg';
import serviceGreenPandhal from '@/assets/service-green.png';
import serviceDj from '@/assets/service-dj.png';
import serviceMakeup from '@/assets/service-makeup.jpeg';
import servicePhoto from '@/assets/service-photo.png';
import serviceArch from '@/assets/service-arch.jpg';
import serviceMelam from '@/assets/service-melam.png';

const additionalServices = [
  {
    title: 'Welcome Backdrop',
    image: serviceBackdrop,
    description: 'Stunning backdrop designs for photo opportunities and welcome areas.',
  },
  {
    title: 'Flex Printing',
    image: serviceFlex,
    description: 'High-quality flex banners and standees for your event branding.',
  },
  {
    title: 'Car Decoration',
    image: serviceCar,
    description: 'Beautiful floral and ribbon decorations for bridal and guest vehicles.',
  },
  {
    title: 'Poo Pandhal',
    image: servicePandhal,
    description: 'Traditional flower pandhal setups for auspicious ceremonies.',
  },
  {
    title: 'Flower Garland',
    image: serviceGarland,
    description: 'Fresh and fragrant flower garlands for all occasions.',
  },
  {
    title: 'Green Pandhal',
    image: serviceGreenPandhal,
    description: 'Traditional green leaf pandhal with banana leaves and coconut fronds.',
  },
  {
    title: 'Serial Arch',
    image: serviceArch,
    description: 'Beautiful LED serial light arches for entrances and pathways.',
  },
  {
    title: 'Makeup Services',
    image: serviceMakeup,
    description: 'Professional bridal and party makeup by certified artists.',
  },
  {
    title: 'Photography',
    image: servicePhoto,
    description: 'Candid and traditional photography to capture your precious moments.',
  },
  {
    title: 'Catering',
    image: serviceCatering,
    description: 'Delicious multi-cuisine catering with vegetarian and non-vegetarian options.',
  },
  {
    title: 'Melam',
    image: serviceMelam,
    description: 'Traditional nadaswaram and thavil for ceremonial music.',
  },
  {
    title: 'DJ & Sound',
    image: serviceDj,
    description: 'Professional DJ services with high-quality sound systems.',
  },
];

const AdditionalServices = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Additional Services"
            subtitle="Complete your event with our range of specialized services"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elegant transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            We can customize our services to match your specific requirements. Contact us to discuss your needs!
          </p>
          <a
            href="/enquiry"
            className="inline-block px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-cream transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default AdditionalServices;
