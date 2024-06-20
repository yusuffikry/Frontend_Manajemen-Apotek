import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #3498db;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>ApotekCare.com</p>
    </FooterContainer>
  );
};

export default Footer;
