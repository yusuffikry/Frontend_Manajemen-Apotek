import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  // const currentPath = window.location.pathname;

  // if (!isAuthenticated && (currentPath.startsWith('/admin') || currentPath.startsWith('/user'))) {
  //   return <Navigate to="/login" replace />;
  // }

  const currentPath = window.location.pathname;

  if (!isAuthenticated && (currentPath.startsWith('/admin') || currentPath.startsWith('/user'))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;