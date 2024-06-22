import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: #3498db;
  padding: 2rem;
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
  margin-right: 5px; /* Adjust the margin between items as needed */
  padding: 8px 16px; /* Add padding for better click area */

  &:hover {
    background-color: #2980b9; /* Darken background color on hover */
  }

  &.active {
    font-weight: bold;
    background-color: #2980b9; /* Set background color for active state */
    border-radius: 5px; /* Optional: Add rounded corners */
  }
`;

const Brand = styled.h1`
  color: #ffffff;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Brand>Admin Dashboard</Brand>
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
