import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const TableContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 2rem auto;
`;

const Table = styled.table`
  width: 100%;
  max-width: 100%;
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

const RightButtonContainer = styled(ButtonContainer)`
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const AddUserButton = styled(Button)`
  background-color: #1abc9c;
  margin-bottom: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const SaveButton = styled(Button)`
  background-color: #2ecc71;
  margin-right: 0.5rem;

  &:hover {
    background-color: #27ae60;
  }
`;

const CancelButton = styled(Button)`
  background-color: #95a5a6;

  &:hover {
    background-color: #7f8c8d;
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
  background-color: #467aa4;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
`;

const FormTitle = styled.h3``;

const InputContainer = styled.div`
  width: 90%;
  margin-bottom: 0.5rem;
  align-items: flex-start;
`;

const Label = styled.label`
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.1rem 0;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const Select = styled.select`
  width: 103%;
  padding: 0.5rem;
  margin: 0.1rem 0;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const ManageUsers = () => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));

    fetchUsers();
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    nama_user: "",
    email: "",
    alamat: "",
    role: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({
    id_user : "",
    nama_user: "",
    email: "",
    alamat: "",
    role: "",
    password: "",
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
    if (newUser.role === null && editUser !== null ) {
      return alert("Role tidak boleh null")
    }
    if (isEditing) {
      const updateUser = async () => {
        await axios.put(
          `http://localhost:8000/api/user/${editUser.id_user}`,
          {
            nama_user: editUser.nama_user,
            role: editUser.role,
            email: editUser.email,
            alamat: editUser.alamat,
            password: editUser.password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      };
      updateUser();
      fetchUsers();
      setIsEditing(false);
      setIsAdding(false);
      setEditUser({
        nama_user: "",
        email: "",
        alamat: "",
        role: "",
        password: "",
      });
    } else {
      console.log(newUser)
      const addUser = async () => {
        await axios.post(
          "http://localhost:8000/api/user",
          {
            nama_user: newUser.nama_user,
            role: newUser.role,
            email: newUser.email,
            alamat: newUser.alamat,
            password: newUser.password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      };
      addUser();
      fetchUsers();
      setNewUser({
        nama_user: "",
        email: "",
        alamat: "",
        role: "",
        password: "",
      });

      setIsAdding(false);
    }
  };
  const handleDeleteUser = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    
    if (confirmDelete) {
      const userToEdit = data[index];
      console.log(userToEdit)
      const deleteUser = async () => {
        await axios.delete(
          `http://localhost:8000/api/user/${userToEdit.id_user}`,

          
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
          
        );
      };
      deleteUser()
      setEditUser({
        nama_user: "",
        email: "",
        alamat: "",
        role: "",
        password: "",
      });
      fetchUsers()
    }
  };

  const handleEditUser = (index) => {
    setIsEditing(true);
    const userToEdit = data[index];
    setEditUser({ ...userToEdit });
    console.log(userToEdit);
    setIsAdding(true); // Show the form
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewUser({ nama_user: "", email: "", alamat: "", role: "", password: "" });
    setEditUser({ nama_user: "", email: "", alamat: "", role: "", password: "" });
  };

  return (
    <TableContainer>
      <h3>Manage Users</h3>
      {!isAdding &&
        !isEditing && ( // Conditionally render the Add button
          <RightButtonContainer>
            <AddUserButton
              onClick={() => {
                setIsAdding(true);
                setIsEditing(false);
                setEditUser({
                  nama_user: "",
                  email: "",
                  alamat: "",
                  role: "",
                  password: "",
                });
              }}
            >
              Add User
            </AddUserButton>
          </RightButtonContainer>
        )}
      {(isAdding || isEditing) && (
        <FormContainer>
          <FormTitle>{isEditing ? "Edit User" : "Add User"}</FormTitle>
          <InputContainer>
            <Label>Name</Label>
            <Input
              type="text"
              name="nama_user"
              placeholder="Name"
              value={isEditing ? editUser.nama_user : newUser.name}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={isEditing ? editUser.email : newUser.email}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Address</Label>
            <Input
              type="text"
              name="alamat"
              placeholder="Address"
              value={isEditing ? editUser.alamat : newUser.alamat}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Role</Label>
            <Select
              name="role"
              value={isEditing ? editUser.role : newUser.role}
              onChange={handleInputChange}
            >
              {isAdding && <option value="">Select Role</option>}
              <option value="2">Admin</option>
              <option value="1">Employee</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={isEditing ? editUser.password : newUser.password}
              onChange={handleInputChange}
            />
          </InputContainer>
          <ButtonContainer>
            <SaveButton onClick={handleAddUser}>
              {isEditing ? "Save Changes" : "Add User"}
            </SaveButton>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          </ButtonContainer>
        </FormContainer>
      )}
      <Table>
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
              <Td>{row.nama_user}</Td>
              <Td>{row.email}</Td>
              <Td>{row.alamat}</Td>
              <Td>{row.role === 1 ? "employee" : "admin"}</Td>
              <Td>
                <ButtonContainer>
                  <EditButton onClick={() => handleEditUser(index)}>
                    Update
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteUser(index)}>
                    Delete
                  </DeleteButton>
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
