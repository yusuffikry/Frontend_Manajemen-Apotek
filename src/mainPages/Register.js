// File: Register.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  width: 700px;
  max-width: 100%; /* Ensure it doesn't exceed 90% of the viewport width */
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

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent form submission
    // Implement register logic here
    // Example: Save user data and navigate to login
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
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
        <LoginLink>Sudah punya akun? <a href="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</a></LoginLink>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
