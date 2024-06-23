import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding: 20px;
`;

const ProfileDetails = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 600px; /* Adjust the width as needed */
  max-width: 60%;
  text-align: left; /* Align text to the left for better readability */
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const Detail = styled.p`
  font-size: 1.25rem; /* Slightly smaller font size */
  margin: 15px 0; /* More margin for better spacing */
  padding: 10px;
  border-bottom: 1px solid #ccc; /* Add a bottom border for separation */
  &:last-child {
    border-bottom: none; /* Remove border for the last detail */
  }
`;

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 50%; /* Account for padding */
  padding: 10px;
  margin: 20px auto;
  border: none;
  border-radius: 15px;
  background-color: #1abc9c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #16a085;
  }
`;

const EditProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const EditProfileForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px; /* Adjust the width as needed */
  max-width: 90%; /* Ensure it doesn't exceed 90% of the viewport width */
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: left;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px); /* Account for padding */
  padding: 10px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('password123');
  const [address, setAddress] = useState('123 Main St');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add logic to save updated profile information
    console.log('Profile updated:', { username, email, password, address });
    alert('Profile updated successfully!');
  };

  if (isEditing) {
    return (
      <EditProfileContainer>
        <EditProfileForm onSubmit={handleSaveClick}>
          <Title>Edit Profile</Title>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Button type="submit">Save Changes</Button>
        </EditProfileForm>
      </EditProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileDetails>
        <Title>User Profile</Title>
        <Detail><DetailLabel>Name:</DetailLabel> {username}</Detail>
        <Detail><DetailLabel>Email:</DetailLabel> {email}</Detail>
        <Detail><DetailLabel>Password:</DetailLabel> {password}</Detail>
        <Detail><DetailLabel>Address:</DetailLabel> {address}</Detail>
        <Button onClick={handleEditClick}>Edit Profile</Button>
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default UserProfile;
