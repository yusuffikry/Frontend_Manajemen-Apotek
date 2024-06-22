import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  max-width: 2100px; /* Atur lebar maksimum tabel */
  margin: 2rem auto; /* Pusatkan tabel dengan margin atas dan bawah 2rem */
`;

const Table = styled.table`
  width: 100%;
  max-width: 100%; /* Gunakan lebar maksimum tabel sesuai dengan container */
  border-collapse: collapse;
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
      <h1>Manage Users</h1>
      <Table>
        <thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.username}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
              <Td>
                <ButtonContainer>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
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
