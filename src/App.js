import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pagesAdmin/Dashboard';
import Login from './Login';
import Register from './Register'; // Import the Register component
import ManageUsers from './pagesAdmin/ManageUsers';
import StokObat from './pagesAdmin/StokObat';
import DataPemasok from './pagesAdmin/DataPemasok';
import TransaksiPenjualan from './pagesAdmin/TransaksiPenjualan';
import DataKaryawan from './pagesAdmin/DataKaryawan';

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
          <Route path="/data-karyawan" element={<DataKaryawan />} />
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
