import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Hykoo <span>Events</span></h3>
            <p>
              We specialize in creating memorable experiences that leave lasting impressions. 
              From intimate gatherings to grand celebrations, we bring your vision to life.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">Wedding</Link></li>
              <li><Link to="/services">Birthday Party</Link></li>
              <li><Link to="/services">Anniversary</Link></li>
              <li><Link to="/services">Baby Shower</Link></li>
              <li><Link to="/services">Engagement</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>More Services</h4>
            <ul>
              <li><Link to="/services">Naming Ceremony</Link></li>
              <li><Link to="/services">Mehendi Ceremony</Link></li>
              <li><Link to="/services">Cultural Events</Link></li>
              <li><Link to="/services">Office Party</Link></li>
              <li><Link to="/services">Bachelorette Party</Link></li>
              <li><Link to="/services">Sangeet Ceremony</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> Periyar Nagar, Bhavani, Tamil Nadu 638316</li>
              <li><i className="fas fa-phone"></i> +91 8015275980</li>
              <li><i className="fas fa-envelope"></i> santhoshkhanmech@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} <span>Hykoo Events</span>. All Rights Reserved. 
            Crafted with <i className="fas fa-heart" style={{ color: '#f4b41a' }}></i> for unforgettable moments.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
