import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #3498db;
`;

const RegisterForm = styled.div`
  background-color: #467aa4;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #16a085;
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement register logic here
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <Title>Register</Title>
        <Input type="name" placeholder='Name'/>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button onClick={handleRegister}>Daftar</Button>
        <p>Sudah punya akun? <a href="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</a></p>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
