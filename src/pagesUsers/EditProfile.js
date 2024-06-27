import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ProfileDetails = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px; /* Adjust the width as needed */
  max-width: 60%;
  text-align: left; /* Align text to the left for better readability */
`;

const Title = styled.h2`
  margin-bottom: 1rem;
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
  height: 80vh;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0rem;
`;

const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({
    id_user: 0,
    nama_user: '',
    email: '',
    role: '',
    alamat: '',
    password: ''
  });
  const [editPassword, setEditPassword] = useState(false); // State to track if user wants to edit password

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          }
        });
        setEditUser({
          id_user: response.data.id_user,
          nama_user: response.data.nama_user,
          email: response.data.email,
          role: response.data.role === 1 ? 'employee' : 'admin',
          alamat: response.data.alamat,
          password: '' // Tidak disarankan untuk mengirimkan password dalam respons
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        nama_user: editUser.nama_user,
        email: editUser.email,
        alamat: editUser.alamat,
      };
      if (editPassword) {
        userData.password = editUser.password; // Include password only if editPassword is true
      }
      const response = await axios.put(`http://localhost:8000/api/user/${editUser.id_user}`, userData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
      });
      console.log('Profile updated successfully:', response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <ProfileContainer>
      {isEditing ? (
        <EditProfileContainer>
          <EditProfileForm onSubmit={handleSaveClick}>
            <Title>Edit Profile</Title>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={editUser.nama_user}
              onChange={(e) => setEditUser({ ...editUser, nama_user: e.target.value })}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              required
            />
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              value={editUser.alamat}
              onChange={(e) => setEditUser({ ...editUser, alamat: e.target.value })}
              required
            />
            <CheckboxContainer>
              <input
                type="checkbox"
                id="editPassword"
                checked={editPassword}
                onChange={() => setEditPassword(!editPassword)}
              />
              <CheckboxLabel htmlFor="editPassword">Edit Password</CheckboxLabel>
            </CheckboxContainer>
            {editPassword && (
              <React.Fragment>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={editUser.password}
                  onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                  required
                />
              </React.Fragment>
            )}
            <Button type="submit">Save Changes</Button>
          </EditProfileForm>
        </EditProfileContainer>
      ) : (
        <ProfileDetails>
          <Title>User Profile</Title>
          <Detail><DetailLabel>Name:</DetailLabel> {editUser.nama_user}</Detail>
          <Detail><DetailLabel>Email:</DetailLabel> {editUser.email}</Detail>
          <Detail><DetailLabel>Role:</DetailLabel> {editUser.role}</Detail>
          <Detail><DetailLabel>Address:</DetailLabel> {editUser.alamat}</Detail>
          <Button onClick={handleEditClick}>Update Profile</Button>
        </ProfileDetails>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
