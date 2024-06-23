// File: App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pagesAdmin/Dashboard';
import Login from './mainPages/Login';
import Register from './mainPages/Register';
import ManageUsers from './pagesAdmin/ManageUsers';
import StokObat from './pagesAdmin/StokObat';
import DataPemasok from './pagesAdmin/DataPemasok';
import TransaksiPenjualan from './pagesAdmin/TransaksiPenjualan';
import DataKaryawan from './pagesAdmin/DataKaryawan';
import DashboardUser from './pagesUsers/DashboardUsers';
import EditProfile from './pagesUsers/EditProfile';
import PenjualanObat from './pagesUsers/PenjualanObat';
import MainDashboard from './mainPages/MainDashboard'; // Import MainDashboard component

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
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  return (
    <AppContainer>
      {!isAuthPage && <Navbar />}
      <MainContent>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/data-karyawan" element={<DataKaryawan />} />
          <Route path="/admin/data-pemasok" element={<DataPemasok />} />
          <Route path="/admin/stok-obat" element={<StokObat />} />
          <Route path="/admin/transaksi-penjualan" element={<TransaksiPenjualan />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/user/penjualan-obat" element={<PenjualanObat />} />
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
