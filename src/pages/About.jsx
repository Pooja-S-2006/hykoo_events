import SectionTitle from '@/components/SectionTitle';
import { Target, Eye, Heart, Award, Users, Calendar } from 'lucide-react';

import owner1 from '@/assets/owner1.jpg';
import owner2 from '@/assets/owner2.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroCorporate from '@/assets/hero-corporate.jpg';
import heroBirthday from '@/assets/hero-birthday.jpg';
import heroCultural from '@/assets/hero-cultural.jpg';

const values = [
  { icon: Heart, title: 'Passion', description: 'We pour our hearts into every event we create.' },
  { icon: Award, title: 'Excellence', description: 'Striving for perfection in every detail.' },
  { icon: Users, title: 'Client Focus', description: 'Your satisfaction is our ultimate goal.' },
  { icon: Calendar, title: 'Reliability', description: 'Delivering on time, every time.' },
];

const pastEvents = [heroWedding, heroCorporate, heroBirthday, heroCultural];

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              About Hykoo Events
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Creating unforgettable moments and turning dreams into reality for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Our Story" subtitle="From humble beginnings to industry leaders" />
          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded in 2009, Hykoo Events started with a simple mission: to help people celebrate 
              their special moments with style and grace. What began as a small family venture has 
              grown into one of the most respected event management companies in the region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Over the past 15 years, we have had the privilege of being part of over 500 celebrations, 
              from intimate family gatherings to grand corporate events. Our success is built on the 
              foundation of trust, creativity, and an unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-container">
        <SectionTitle title="Our Values" subtitle="The principles that guide everything we do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-soft border border-border hover:shadow-elegant transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-serif text-xl font-bold text-primary mb-2">{value.title}</h4>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Owner's Message */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Meet Our Founders" subtitle="The visionaries behind Hykoo Events" />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Owner 1 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-elegant">
              <div className="relative h-64">
                <img src={owner1} alt="Santhosh S" className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-serif text-xl font-bold">Santhosh S</h3>
                  <p className="text-white/80">Co-Founder & CEO</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed italic">
                  "Every event we organize is a reflection of our dedication to excellence. We believe 
                  that the smallest details make the biggest difference. Our team works with passion 
                  and precision to ensure that your special day is nothing short of perfect. Thank you 
                  for trusting us with your celebrations."
                </p>
              </div>
            </div>

            {/* Owner 2 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-elegant">
              <div className="relative h-64">
                <img src={owner2} alt="Parthipan N" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-serif text-xl font-bold">Parthipan N</h3>
                  <p className="text-white/80">Co-Founder & Creative Director</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed italic">
                  "Creativity is at the heart of everything we do. Every celebration is unique, and 
                  we take pride in bringing your vision to life with innovative ideas and stunning 
                  designs. From concept to execution, we are with you every step of the way. Let's 
                  create something beautiful together."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="section-container">
        <SectionTitle
          title="Our Successful Events"
          subtitle="A glimpse of memorable celebrations we've organized"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pastEvents.map((image, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-xl group">
              <img
                src={image}
                alt={`Past event ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
