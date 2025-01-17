import React, {useContext} from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../AuthContext';

const NavbarContainer = styled.div`
  background-color: #3498db;
  padding: 2rem 2rem;
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
  font-size: 1rem;
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
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const isAdmin = location.pathname.startsWith('/admin');
  const isUser = location.pathname.startsWith('/user');
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  };
  
  return (
    <NavbarContainer>
      <Brand to={isAdmin ? "/admin" : "/user"}>
        {isAdmin ? "Admin Dashboard" : "User Dashboard"}
      </Brand>
      <NavLinks>
        {isAdmin && (
          <>
            <NavItem to="/admin/manage-users" activeclassname="active">Manage Users</NavItem>
            <NavItem to="/admin/data-pemasok" activeclassname="active">Supplier Data</NavItem>
            <NavItem to="/admin/stok-obat" activeclassname="active">Medicine Stock</NavItem>
            <NavItem to="/admin/transaksi-penjualan" activeclassname="active">Transactions</NavItem>
          </>
        )}
        {isUser && (
          <>
            <NavItem to="/user/transaksi-penjualan" activeclassname="active">Transactions</NavItem>
            <NavItem to="/user/edit-profile" activeclassname="active">Profile</NavItem>
          </>
        )}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;