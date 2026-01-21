import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <i className="fas fa-star"></i>
          Hykoo <span>Events</span>
        </NavLink>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
          <NavLink to="/portfolio" onClick={closeMenu}>Portfolio</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </div>

        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
