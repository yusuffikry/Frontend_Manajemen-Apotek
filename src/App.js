import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './Login';
import ManageUsers from './pages/ManageUsers'; // Import the ManageUsers component

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-users" element={<ManageUsers />} /> {/* Add this route */}
            <Route path="/data-karyawan" element={<Dashboard />} />
            <Route path="/data-pemasok" element={<div>Data Pemasok Page</div>} />
            <Route path="/stok-obat" element={<div>Stok Obat Page</div>} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
