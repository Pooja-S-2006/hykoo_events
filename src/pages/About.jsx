function About() {
  const features = [
    {
      icon: 'fa-award',
      title: 'Award Winning',
      description: 'Recognized excellence in event management with multiple industry awards.'
    },
    {
      icon: 'fa-users',
      title: 'Expert Team',
      description: 'Dedicated professionals with years of experience in creating memorable events.'
    },
    {
      icon: 'fa-clock',
      title: '24/7 Support',
      description: 'Round-the-clock assistance to ensure your event runs smoothly.'
    },
    {
      icon: 'fa-handshake',
      title: 'Trusted Partners',
      description: 'Strong relationships with top vendors for the best services and prices.'
    }
  ];

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Discover the story behind Hykoo Events</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600" 
                alt="Hykoo Events Team"
              />
            </div>
            <div className="about-text">
              <h2>We Create Moments That Last Forever</h2>
              <p>
                Founded with a passion for creating extraordinary experiences, Hykoo Events 
                has been at the forefront of event management for over a decade. Our journey 
                began with a simple belief: every celebration deserves to be exceptional.
              </p>
              <p>
                Today, we are proud to have orchestrated hundreds of successful events, 
                from intimate gatherings to grand celebrations. Our team of dedicated 
                professionals brings creativity, precision, and heart to every project.
              </p>
              <p>
                We don't just plan events — we craft memories. Each celebration we manage 
                is a unique story waiting to unfold, and we are honored to be a part of 
                our clients' most cherished moments.
              </p>
            </div>
          </div>

          <div className="mission-vision">
            <div className="mv-card">
              <i className="fas fa-bullseye"></i>
              <h3>Our Mission</h3>
              <p>
                To transform every event into an unforgettable experience by combining 
                innovative ideas, meticulous planning, and flawless execution that 
                exceeds expectations.
              </p>
            </div>
            <div className="mv-card">
              <i className="fas fa-eye"></i>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted name in event management, known for creating 
                magical moments that bring joy and lasting memories to people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-us section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Experience the difference that dedication and expertise make
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
