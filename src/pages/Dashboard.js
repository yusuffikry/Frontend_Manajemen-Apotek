import React from 'react';
import styled from 'styled-components';
import Form from '../components/Form';
import DataTable from '../components/DataTable';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h2>Mengelola Data Karyawan</h2>
      <Form />
      <h3>Data Karyawan</h3>
      <DataTable />
    </DashboardContainer>
  );
};

export default Dashboard;
