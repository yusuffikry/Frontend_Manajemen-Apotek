import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './bg_apotek.jpeg';
import axios from 'axios'; // Sesuaikan dengan path gambar latar belakang yang benar

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

const Login = (e) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    if (email.length > 1 && password.length > 1) {
      await axios.post("http://127.0.0.1:8000/auth/login", {
        "username" : email,
        "password" : password
      }
      ,{ headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
        
      }}
    )
    .then((res)=>{
      localStorage.setItem('isAuthenticated', 'true');
      console.log(res);
      localStorage.setItem("token" , res.data.access_token)
      navigate('/admin');
    }).catch(
      (error)=>{console.log(error)}
    )
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
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
