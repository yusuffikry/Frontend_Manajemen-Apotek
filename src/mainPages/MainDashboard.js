// File: MainDashboard.js
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
  font-size: 5rem;
  margin-bottom: 20px; /* Atur margin bottom untuk membuat jarak dengan h3 */
`;

const SubTitle = styled.h3`
  margin-top: 0; /* Atur margin top untuk menghilangkan jarak atas default */
`;

const ActionButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 1.5rem; /* Adjust font size as needed */
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const MainDashboard = () => {
  return (
    <DashboardContainer>
      <ContentWrapper>
        <MainTitle>ApotekCare</MainTitle>
        <SubTitle>Aplikasi manajemen apotek untuk mempermudah pengelolaan stok obat dan transaksi penjualan.</SubTitle>
        <Link to="/login">
          <ActionButton>Login</ActionButton>
        </Link>
        <Link to="/register">
          <ActionButton>Register</ActionButton>
        </Link>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default MainDashboard;
