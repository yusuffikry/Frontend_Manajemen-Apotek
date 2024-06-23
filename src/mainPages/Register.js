import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './bg_apotek.jpeg'; // Sesuaikan dengan path gambar latar belakang yang benar

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage}); /* Set background image */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
`;

const RegisterForm = styled.form`
  background-color: rgba(70, 122, 164, 0.8); /* Blue semi-transparent background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  width: 600px; /* Adjust the width as needed */
  max-width: 90%; /* Ensure it doesn't exceed 90% of the viewport width */
  position: relative; /* Ensure relative positioning for child elements */
`;

const Title = styled.h1`
  margin-bottom: 2rem;
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

const LoginLink = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const ArrowBack = styled(Link)`
  position: absolute;
  top: 55px; /* Adjust top position */
  left: 35px; /* Adjust left position */
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

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Implement register logic here
    // For example, save user data and navigate to login
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
        <ArrowBack to="/">
          <BackIcon xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </BackIcon>
        </ArrowBack>
        <Title>Register</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <Button type="submit">Daftar</Button>
        <LoginLink>Sudah punya akun? <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</Link></LoginLink>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
