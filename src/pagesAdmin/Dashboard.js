import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Set to full viewport height */
`;

const DashboardContainer = styled.div`
  text-align: center;
  max-width: 6900px; /* Optional: Limit maximum width */
  width: 100%; /* Ensure full width */
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Dashboard = () => {
  return (
    <CenteredContainer>
      <DashboardContainer>
        <DashboardTitle>Welcome to the Admin Dashboard</DashboardTitle>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Hello, Admin! Welcome back to your dashboard. Here you can manage the system, view analytics, and perform administrative tasks.</p>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Please use the navigation menu to access different sections of the admin panel.</p>
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default Dashboard;
