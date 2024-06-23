// File: Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './bg_apotek.jpeg'; // Sesuaikan dengan path gambar latar belakang yang benar

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage}); /* Set background image */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
`;

const LoginForm = styled.form`
  background-color: rgba(70, 122, 164, 0.8); /* Blue semi-transparent background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  width: 600px; /* Adjust the width as needed */
  max-width: 90%; /* Ensure it doesn't exceed 90% of the viewport width */
`;

const Title = styled.h1`
  margin-bottom: 3rem;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px); /* Account for padding */
  padding: 10px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 100%; /* Account for padding */
  padding: 10px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #16a085;
  }
`;

const RegisterLink = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      navigate('/data-karyawan');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Masuk</Button>
        <RegisterLink>Belum punya akun? <a href="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</a></RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
