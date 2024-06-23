import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './bg_apotek.jpeg'; // Sesuaikan dengan path gambar latar belakang yang benar

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage}); /* Set background image */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
`;

const LoginForm = styled.form`
  position: relative; /* Ensure relative positioning for child elements */
  background-color: rgba(70, 122, 164, 0.8); /* Blue semi-transparent background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  width: 500px; /* Adjust the width as needed */
  max-width: 90%; /* Ensure it doesn't exceed 90% of the viewport width */
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  display: inline-block; /* Ensure block-level element behavior */
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px); /* Account for padding */
  padding: 10px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%; /* Account for padding */
  padding: 10px;
  margin: 10px auto;
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

const RegisterLink = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
`;

const ArrowBack = styled(Link)`
  position: absolute;
  top: 55px;
  left: 35px; /* Adjust left position to place arrow icon */
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const BackIcon = styled.svg`
  margin-right: 5px; /* Add space between icon and text */
  vertical-align: middle; /* Align icon vertically with text */
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
        <ArrowBack to="/">
          <BackIcon xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </BackIcon>
        </ArrowBack>
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
        <RegisterLink>Belum punya akun? <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</Link></RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
