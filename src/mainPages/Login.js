import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './bg_apotek.jpeg';
import axios from 'axios';
import qs from 'qs';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

const LoginForm = styled.form`
  position: relative;
  background-color: rgba(70, 122, 164, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  width: 500px;
  max-width: 90%;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  display: inline-block;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
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

const ArrowBack = styled(Link)`
  position: absolute;
  top: 55px;
  left: 35px;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const BackIcon = styled.svg`
  margin-right: 5px;
  vertical-align: middle;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length > 1 && password.length > 1) {
      try {
        const formData = qs.stringify({
          username: email,
          password: password
        });

        const res = await axios.post("http://127.0.0.1:8000/auth/login", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        });

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem("token", res.data.access_token);

        const userRes = await axios.get("http://localhost:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
          },
        });

        const userRole = userRes.data.role; // Assuming the role is in the response data
        console.log("User role:", userRole); // Debugging line

        if (userRole === 0 || userRole === 2) {
          navigate('/admin');        
        } else if (userRole === 1) {
          navigate('/user');
        } else {
          console.error("Invalid user role:", userRole);
          setError(`Invalid user role: ${userRole}`);
        }
      } catch (error) {
        console.error("Login error:", error);
        setError('Invalid username or password. Please try again.');
      }
    } else {
      setError('Please enter both username and password.');
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
        <Title>Form Login</Title>
        <Input
          type="text"
          placeholder="username"
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
