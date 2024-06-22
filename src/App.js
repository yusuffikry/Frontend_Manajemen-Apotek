import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './Login';
import Register from './Register'; // Import the Register component
import ManageUsers from './pages/ManageUsers';
import StokObat from './pages/StokObat';
import DataPemasok from './pages/DataPemasok';
import TransaksiPenjualan from './pages/TransaksiPenjualan';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AppContainer>
      {!isAuthPage && isAuthenticated && <Navbar />}
      <MainContent>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/data-karyawan" element={<Dashboard />} />
              <Route path="/data-pemasok" element={<DataPemasok />} />
              <Route path="/stok-obat" element={<StokObat />} />
              <Route path="/transaksi-penjualan" element={<TransaksiPenjualan />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </MainContent>
      {!isAuthPage && isAuthenticated && <Footer />}
    </AppContainer>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
