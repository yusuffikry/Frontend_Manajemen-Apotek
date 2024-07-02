import React, { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pagesAdmin/Dashboard';
import Login from './mainPages/Login';
import ManageUsers from './pagesAdmin/ManageUsers';
import StokObat from './pagesAdmin/StokObat';
import DataPemasok from './pagesAdmin/DataPemasok';
import TransaksiPenjualan from './pagesAdmin/TransaksiPenjualan';
import DashboardUser from './pagesUsers/DashboardUsers';
import EditProfile from './pagesUsers/EditProfile';
import MainDashboard from './mainPages/MainDashboard';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';


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
  const isAuthPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <AppContainer>
      {!isAuthPage && <Navbar />}
      <MainContent>
        <Routes >
          <Route path="/" element={<MainDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute roles={2}><Dashboard /></ProtectedRoute>} />
          {/* <ProtectedRoute path="/admin" element={<Dashboard />} roles={['2']} /> */}
          <Route path="/admin/manage-users" element={<ProtectedRoute roles={2}><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/data-pemasok" element={<ProtectedRoute roles={2}><DataPemasok /></ProtectedRoute>} />
          <Route path="/admin/stok-obat" element={<ProtectedRoute roles={2}><StokObat /></ProtectedRoute>} />
          <Route path="/admin/transaksi-penjualan" element={<ProtectedRoute roles={2}><TransaksiPenjualan /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute roles={1}><DashboardUser /></ProtectedRoute>} />
          <Route path="/user/edit-profile" element={<ProtectedRoute roles={1}><EditProfile /></ProtectedRoute>} />
          <Route path="/user/transaksi-penjualan" element={<ProtectedRoute roles={1}><TransaksiPenjualan /></ProtectedRoute>} />
        </Routes>
      </MainContent>
      {!isAuthPage && <Footer />}
    </AppContainer>
  );
};

const AppWrapper = () => (
  <StrictMode>
    <AuthProvider>
      <Router>

        <App />

      </Router>
    </AuthProvider>
  </StrictMode>
);

export default AppWrapper;