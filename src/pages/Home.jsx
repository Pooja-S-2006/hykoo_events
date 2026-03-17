import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Ui';
import { LogIn, UserPlus, Calendar, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Additional Services', path: '/additional-services' },
    { name: 'Enquiry', path: '/enquiry' },
    { name: 'Feedback & Reviews', path: '/feedback' },
  ];

  const handleNavClick = (path) => {
    setActivePath(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-elegant py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-primary font-bold text-lg">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-serif text-xl font-bold">Hykoo Events</h1>
                <p className="text-white/80 text-xs italic">We Empower Your Dreams</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-white hover:text-cream transition-colors font-medium py-2 px-3 rounded-lg ${
                    activePath === link.path ? 'bg-white/20 text-primary' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:block text-white text-sm">{user?.name}</span>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 hover:text-primary"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground hover:bg-gray-100 hover:text-primary"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileDropdown(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-1 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-4 py-3 text-white rounded-lg transition-colors hover:bg-white/10 ${
                    activePath === link.path ? 'bg-white/20 text-primary' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 pt-20">
        <div className="text-center p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Welcome to Hykoo Events'}
            </h1>
            <p className="text-white/80 text-lg mb-8">
              {isAuthenticated 
                ? 'Continue managing your events and bookings' 
                : 'Your Dream Event Planning Partner'
              }
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {isAuthenticated ? 'Quick Actions' : 'Get Started'}
            </h2>
            <p className="text-white/80 mb-8">
              {isAuthenticated 
                ? 'Access your dashboard, manage bookings, or explore our services.'
                : 'Login to access your dashboard and manage your events, or create a new account to get started with our services.'
              }
            </p>
            
            <div className="space-y-4">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-white text-primary hover:bg-gray-100 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Calendar size={20} />
                    Go to Dashboard
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/my-bookings')}
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <User size={20} />
                    My Bookings
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/services')}
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Calendar size={20} />
                    Browse Services
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-white text-primary hover:bg-gray-100 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <LogIn size={20} />
                    Login to Your Account
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/signup')}
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <UserPlus size={20} />
                    Create New Account
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
