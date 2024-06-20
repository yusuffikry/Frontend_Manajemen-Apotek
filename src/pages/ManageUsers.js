import React from 'react';
import styled from 'styled-components';

<<<<<<< HEAD
const ManageUsersContainer = styled.div`
  padding: 2rem;
`;

const ManageUsers = () => {
  return (
    <ManageUsersContainer>
      <h2>Manage Users Page</h2>
      {/* Your content for managing users */}
    </ManageUsersContainer>
=======
const TableContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: center; /* Center align text in all table cells */
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Center align buttons horizontally */
  gap: 0.5rem; /* Space between buttons */
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const ManageUsers = () => {
  const data = [
    { username: 'user1', email: 'user1@example.com', role: 'Admin' },
    { username: 'user2', email: 'user2@example.com', role: 'User' },
    { username: 'user3', email: 'user3@example.com', role: 'User' },
    { username: 'user4', email: 'user4@example.com', role: 'Moderator' },
  ];

  return (
    <TableContainer>
      <h2>Manage Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>
                <ButtonContainer>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
>>>>>>> 032f5f611940f2f0585e2607ac756b8c4f4da576
  );
};

export default ManageUsers;
