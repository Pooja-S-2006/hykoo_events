import { useState, useEffect } from 'react';

function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      text: "Hykoo Events made our wedding day absolutely magical! Every detail was perfect, from the flowers to the lighting. They truly understood our vision and brought it to life.",
      author: "Sarah & Michael",
      role: "Wedding Clients",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
      text: "Our corporate event was a huge success thanks to the Hykoo team. Their professionalism and attention to detail exceeded our expectations. Highly recommended!",
      author: "David Chen",
      role: "CEO, Tech Corp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    {
      text: "The birthday party they organized for my daughter was beyond amazing! The kids had so much fun, and the decorations were stunning. Thank you, Hykoo!",
      author: "Emily Johnson",
      role: "Happy Parent",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="testimonials section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it — hear from our happy clients
        </p>

        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-quote">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="testimonial-text">
              {testimonials[currentSlide].text}
            </p>
            <div className="testimonial-author">
              <img 
                src={testimonials[currentSlide].avatar} 
                alt={testimonials[currentSlide].author}
                className="testimonial-avatar"
              />
              <div className="testimonial-info">
                <h4>{testimonials[currentSlide].author}</h4>
                <p>{testimonials[currentSlide].role}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`testimonial-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
