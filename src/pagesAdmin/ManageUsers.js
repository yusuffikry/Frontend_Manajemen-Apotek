import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 2rem auto;
`;

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  display: ${(props) => (props.isHidden ? 'none' : 'table')}; /* Hide table if isHidden prop is true */
`;

const Th = styled.th`
  padding: 0.75rem;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: center;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const RightButtonContainer = styled(ButtonContainer)`
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const AddUserButton = styled(Button)`
  background-color: #3498db;
  margin-bottom: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const EditButton = styled(Button)`
  background-color: #1abc9c;
  margin-left: 0.25rem;

  &:hover {
    background-color: #16a085;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  margin-right: 0.25rem;

  &:hover {
    background-color: #c0392b;
  }
`;

const FormContainer = styled.div`
  background-color: #f4f4f4;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 1rem); /* Adjusting width to account for padding */
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const ManageUsers = () => {
  const [data, setData] = useState([
    { name: 'John Doe', email: 'user1@example.com', address: '123 Main St', role: 'Admin' },
    { name: 'Jane Smith', email: 'user2@example.com', address: '456 Elm St', role: 'User' },
    { name: 'Alice Johnson', email: 'user3@example.com', address: '789 Maple Ave', role: 'User' },
    { name: 'Bob Brown', email: 'user4@example.com', address: '101 Pine St', role: 'Moderator' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    password: '' // Added password field
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    password: '' // Added password field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditUser({ ...editUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleAddUser = () => {
    if (isEditing) {
      const updatedData = [...data];
      updatedData[editIndex] = editUser;
      setData(updatedData);
      setEditIndex(null);
      setIsEditing(false);
      setEditUser({ name: '', email: '', address: '', role: '', password: '' });
    } else {
      setData([...data, newUser]);
      setNewUser({ name: '', email: '', address: '', role: '', password: '' });
    }
    setIsAdding(false); // Close the form after adding/editing
  };

  const handleDeleteUser = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    }
  };

  const handleEditUser = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    const userToEdit = data[index];
    setEditUser({ ...userToEdit });
    setIsAdding(true); // Show the form
  };

  return (
    <TableContainer>
      <h3>Manage Users</h3>
      <RightButtonContainer>
        <AddUserButton onClick={() => {
          setIsAdding(!isAdding);
          setIsEditing(false);
          setEditIndex(null);
          setEditUser({ name: '', email: '', address: '', role: '', password: '' });
        }}>
          {isAdding || isEditing ? 'Cancel' : 'Add User'}
        </AddUserButton>
      </RightButtonContainer>
      {(isAdding || isEditing) ? (
        <FormContainer>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={isEditing ? editUser.name : newUser.name}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={isEditing ? editUser.email : newUser.email}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={isEditing ? editUser.address : newUser.address}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="role"
            placeholder="Role"
            value={isEditing ? editUser.role : newUser.role}
            onChange={handleInputChange}
          />
          {isAdding || isEditing ? ( // Display password input only when adding or editing
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={isEditing ? editUser.password : newUser.password}
              onChange={handleInputChange}
            />
          ) : null}
          <AddUserButton onClick={handleAddUser}>{isEditing ? 'Save Changes' : 'Add User'}</AddUserButton>
        </FormContainer>
      ) : null}
      <Table isHidden={isAdding || isEditing}>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Address</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.address}</Td>
              <Td>{row.role}</Td>
              <Td>
                <ButtonContainer>
                  <EditButton onClick={() => handleEditUser(index)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDeleteUser(index)}>Delete</DeleteButton>
                </ButtonContainer>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsers;
