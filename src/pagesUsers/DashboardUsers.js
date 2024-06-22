import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Set to full viewport height */
`;

const DashboardContainer = styled.div`
  text-align: center;
  max-width: 900px; /* Optional: Limit maximum width */
  width: 100%; /* Ensure full width */
`;

const DashboardTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const DashboardText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const DashboardUser = () => {
  return (
    <CenteredContainer>
      <DashboardContainer>
        <DashboardTitle>Welcome to the User Dashboard</DashboardTitle>
        <DashboardText>Hello, User! Welcome to your dashboard. Here you can manage your profile and access user-specific functionalities.</DashboardText>
        <DashboardText>Please use the navigation menu to explore different sections available to you.</DashboardText>
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default DashboardUser;
