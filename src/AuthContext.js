import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // setIsAuthenticated(!!token);
    // console.log(!token);
    // console.log(isAuthenticated)
  }, []);

  const login = (token,user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    // console.log(isAuthenticated)
    window.location.href = "/login"
  };
  

  return (
    <AuthContext.Provider value={{ login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
