import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: #3498db;
  padding: 3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin-right: 5px;
  padding: 8px 16px;

  &:hover {
    background-color: #2980b9;
  }

  &.active {
    font-weight: bold;
    background-color: #2980b9;
    border-radius: 5px;
  }
`;

const Brand = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const handleLogout = () => {
    console.log('Logout button clicked');
  };

  return (
    <NavbarContainer>
      <Brand to="/admin" exact>Admin Dashboard</Brand>
      <NavLinks>
        <NavItem to="/admin/manage-users" activeClassName="active">Manage Users</NavItem>
        <NavItem to="/admin/data-karyawan" activeClassName="active">Data Karyawan</NavItem>
        <NavItem to="/admin/data-pemasok" activeClassName="active">Data Pemasok</NavItem>
        <NavItem to="/admin/stok-obat" activeClassName="active">Stok Obat</NavItem>
        <NavItem to="/admin/transaksi-penjualan" activeClassName="active">Transaksi Penjualan</NavItem>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

        <NavItem to="/user/penjualan-obat" activeClassName="active">Penjualan Obat</NavItem>
        <NavItem to="/user/edit-profile" activeClassName="active">Profile</NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
