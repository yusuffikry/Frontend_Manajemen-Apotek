import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: #3498db;
  padding: 1rem;
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

  &.active {
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <h1>Admin Dashboard</h1>
      <NavLinks>
        <NavItem to="/manage-users" activeClassName="active">Manage Users</NavItem>
        <NavItem to="/data-karyawan" activeClassName="active">Data Karyawan</NavItem>
        <NavItem to="/data-pemasok" activeClassName="active">Data Pemasok</NavItem>
        <NavItem to="/stok-obat" activeClassName="active">Stok Obat</NavItem>
        <NavItem to="/transaksi-penjualan" activeClassName="active">Transaksi Penjualan</NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
