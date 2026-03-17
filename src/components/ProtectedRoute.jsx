import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // List of routes that don't require authentication
  const publicRoutes = ['/'];

  useEffect(() => {
    // If user is not authenticated and trying to access a protected route
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated, location.pathname]);

  // If user is not authenticated and on a protected route, show login modal
  if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
    return (
      <>
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => {
              setShowLoginModal(false);
              // Redirect to home when modal is closed without login
              window.history.pushState({}, '', '/');
            }}
            redirectTo={location.pathname}
          />
        )}
        {/* Show a minimal version of the page or loading state */}
        <div className="min-h-screen flex items-center justify-center bg-secondary">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  // If authenticated or on public route, render children normally
  return <>{children}</>;
};

export default ProtectedRoute;
