import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      {/* Background slideshow */}
      <div className="hero-slideshow">
        <div
          className="hero-slide"
          style={{ backgroundImage: "url('https://wevaphotography.com/wp-content/uploads/2022/02/Hindu-Wedding-Bride-Entry.jpg')", animationDelay: '0s' }}
        />
        <div
          className="hero-slide"
          style={{ backgroundImage: "url('https://www.bookeventz.com/blog/wp-content/uploads/262a8587-d8b1-4819-b90a-a42c4ef14fe6_2.floralheartdecor.jpg')", animationDelay: '5s' }}
        />
        <div
          className="hero-slide"
          style={{ backgroundImage: "url('https://5.imimg.com/data5/SELLER/Default/2025/5/508520536/ZB/NF/RZ/70789186/wedding-event-management-service.jpeg')", animationDelay: '10s' }}
        />
        <div
          className="hero-slide"
          style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/energetic-audience-outdoor-live-concert-600nw-2454781497.jpg')", animationDelay: '15s' }}
        />
        <div
          className="hero-slide"
          style={{ backgroundImage: "url('https://blog.venuelook.com/wp-content/uploads/2025/06/Working-With-Caterers.webp')", animationDelay: '20s' }}
        />
        <div
          className="hero-slide"
          style={{ backgroundImage: "url('https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/09/sangeet-in-a-garba-style.jpg')", animationDelay: '25s' }}
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-badge">
          <i className="fas fa-sparkles"></i> Premium Event Management
        </span>
        <h1 className="hero-title">
          Creating <span>Unforgettable</span> Events
        </h1>
        <p className="hero-subtitle">
          Hykoo Events Manager — Where Dreams Transform Into Reality
        </p>
        <div className="hero-buttons">
          <Link to="/contact" className="btn btn-primary">
            <i className="fas fa-calendar-check"></i>
            Book an Event
          </Link>
          <Link to="/services" className="btn btn-secondary">
            <i className="fas fa-concierge-bell"></i>
            Our Services
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">500+</div>
            <div className="hero-stat-label">Events Completed</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">Expert Team</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">10+</div>
            <div className="hero-stat-label">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
