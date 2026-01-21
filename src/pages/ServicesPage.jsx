import Services from '../components/Services.jsx';
import { Link } from 'react-router-dom';

function ServicesPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive event solutions tailored to your needs</p>
        </div>
      </section>

      <Services />

      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle">
            Let's discuss your event and create something amazing together
          </p>
          <Link to="/contact" className="btn btn-primary">
            <i className="fas fa-calendar-check"></i>
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
