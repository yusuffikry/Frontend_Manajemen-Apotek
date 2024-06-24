import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
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
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const AddButton = styled(Button)`
  width: 50%;
  background-color: #1abc9c;
  margin-top: 1rem;

  &:hover {
    background-color: #16a085;
  }
`;

const EditButton = styled(Button)`
  background-color: #1abc9c;

  &:hover {
    background-color: #16a085;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 2rem auto; /* Center horizontally with auto margins */
  text-align: center; /* Center align text in all table cells */
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const DataPemasok = () => {
  const [data, setData] = useState([
    { id: 1, nama: 'Perusahaan A', telepon: '08123456789' }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    id: '',
    nama: '',
    telepon: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAdd = () => {
    if (isEditing) {
      const updatedData = [...data];
      updatedData[editIndex] = editData;
      setData(updatedData);
      setEditIndex(null);
      setEditData({ id: '', nama: '', telepon: '' });
      setIsEditing(false);
    } else {
      const newData = {
        id: data.length + 1,
        nama: editData.nama,
        telepon: editData.telepon
      };
      setData([...data, newData]);
      setEditData({ id: '', nama: '', telepon: '' });
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    const dataToEdit = data[index];
    setEditData({ ...dataToEdit });
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  return (
    <Container>
      <FormContainer>
        <h3>Managing Supplier Data</h3>
        <Input
          type="text"
          name="name"
          placeholder="Company name"
          value={editData.nama}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={editData.telepon}
          onChange={handleInputChange}
        />
        <AddButton onClick={handleAdd}>{isEditing ? 'Save' : 'Add'}</AddButton>
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Company Name</Th>
            <Th>Phone Number</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <Td>{row.id}</Td>
              <Td>{row.nama}</Td>
              <Td>{row.telepon}</Td>
              <Td>
                <ButtonContainer>
                  <EditButton onClick={() => handleEdit(index)}>Update</EditButton>
                  <DeleteButton onClick={() => handleDelete(index)}>Delete</DeleteButton>
                </ButtonContainer>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataPemasok;
