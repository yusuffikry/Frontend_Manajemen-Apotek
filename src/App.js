import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AppContainer>
      {!isAuthPage && <Navbar />}
      <MainContent>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/data-karyawan" element={<Dashboard />} />
          <Route path="/data-pemasok" element={<DataPemasok />} />
          <Route path="/stok-obat" element={<StokObat />} />
          <Route path="/transaksi-penjualan" element={<TransaksiPenjualan />} />
        </Routes>
      </MainContent>
      {!isAuthPage && <Footer />}
    </AppContainer>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
