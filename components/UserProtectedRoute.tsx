
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContext(AppContext);

  // If context is not yet available, we can show a loader or nothing
  if (!context) {
    return null; 
  }

  if (!context.isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;
