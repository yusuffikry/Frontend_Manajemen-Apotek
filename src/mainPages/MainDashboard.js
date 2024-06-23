import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from './bg_apotek.jpeg'; // Sesuaikan dengan path gambar latar belakang yang benar

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set height to full viewport height */
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 10px;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px; /* Atur margin bottom untuk membuat jarak dengan h3 */
`;

const SubTitle = styled.h3`
  margin-top: 0; /* Atur margin top untuk menghilangkan jarak atas default */
`;

const ActionButton = styled.button`
  margin: 10px;
  padding: 10px 30px;
  font-size: 1.5rem; /* Adjust font size as needed */
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transisi saat hover */

  /* Default background-color untuk kedua tombol */
  background-color: #26355D;

  &:hover {
    background-color: #16a085; /* Warna hover yang berbeda untuk tiap tombol */
  }
`;

const LoginButton = styled(ActionButton)`
  background-color: #26355D; /* Warna default untuk tombol Login */
`;

const RegisterButton = styled(ActionButton)`
  background-color: #2980b9; /* Warna default untuk tombol Register */
`;

const MainDashboard = () => {
  return (
    <DashboardContainer>
      <ContentWrapper>
        <MainTitle>ApotekCare</MainTitle>
        <SubTitle>Aplikasi manajemen apotek untuk mempermudah pengelolaan stok obat dan transaksi penjualan.</SubTitle>
        <Link to="/login">
          <LoginButton>Login</LoginButton>
        </Link>
        <Link to="/register">
          <RegisterButton>Register</RegisterButton>
        </Link>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default MainDashboard;
