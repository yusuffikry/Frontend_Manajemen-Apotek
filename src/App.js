import React, {StrictMode} from 'react';
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
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/manage-users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/data-pemasok" element={<ProtectedRoute><DataPemasok /></ProtectedRoute>} />
          <Route path="/admin/stok-obat" element={<ProtectedRoute><StokObat /></ProtectedRoute>} />
          <Route path="/admin/transaksi-penjualan" element={<ProtectedRoute><TransaksiPenjualan /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><DashboardUser /></ProtectedRoute>} />
          <Route path="/user/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/user/transaksi-penjualan" element={<ProtectedRoute><TransaksiPenjualan /></ProtectedRoute>} />
        </Routes>
      </MainContent>
      {!isAuthPage && <Footer />}
    </AppContainer>
  );
};

const AppWrapper = () => (
  <StrictMode>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
  </StrictMode>
);

export default AppWrapper;