import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated  = localStorage.getItem("token");

  // const currentPath = window.location.pathname;

  // if (!isAuthenticated && (currentPath.startsWith('/admin') || currentPath.startsWith('/user'))) {
  //   return <Navigate to="/login" replace />;
  // }

  const currentPath = window.location.pathname;
  console.log(isAuthenticated)

  console.log(!isAuthenticated && (currentPath.startsWith('/admin') || currentPath.startsWith('/user')))

  if (!isAuthenticated && (currentPath.startsWith('/admin') || currentPath.startsWith('/user'))) {
    return <Navigate to="/login" replace />;
  }
  

  return children;
};

export default ProtectedRoute;