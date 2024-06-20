import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/manage-users" element={<div>Manage Users Page</div>} />
          <Route path="/data-karyawan" element={<Dashboard />} />
          <Route path="/data-pemasok" element={<div>Data Pemasok Page</div>} />
          <Route path="/stok-obat" element={<div>Stok Obat Page</div>} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
