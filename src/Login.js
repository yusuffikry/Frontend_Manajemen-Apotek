import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #3498db;
`;

const LoginForm = styled.form`
  background-color: #467aa4;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
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
  width: calc(100% - 20px); /* Account for padding */
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
  font-size: 0.9rem;
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
