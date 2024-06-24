import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 2rem auto;
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
  width: 90%;
  border-collapse: collapse;
  margin: 2rem auto;
  text-align: center;
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

const MedicineInventory = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Yuta', type: 'Tablet', price: 'Rp20,000', expiryDate: '14 Jan, 10:40 PM', quantity: 450 }
  ]);

  const [form, setForm] = useState({
    id: '',
    name: '',
    type: '',
    price: '',
    expiryDate: '',
    quantity: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleAdd = () => {
    setData([...data, { ...form, id: data.length + 1 }]);
    setForm({ id: '', name: '', type: '', price: '', expiryDate: '', quantity: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    setData(data.map(item => (item.id === form.id ? form : item)));
    setForm({ id: '', name: '', type: '', price: '', expiryDate: '', quantity: '' });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete the medicine with ID ${id}?`)) {
      setData(data.filter(item => item.id !== id));
    }
  };

  return (
    <Container>
      <FormContainer>
        <h3>Managing Medicine Inventory</h3>
        <Input type="text" name="name" placeholder="Medicine Name" value={form.name} onChange={handleInputChange} />
        <Input type="text" name="type" placeholder="Medicine Type" value={form.type} onChange={handleInputChange} />
        <Input type="text" name="price" placeholder="Price" value={form.price} onChange={handleInputChange} />
        <Input type="text" name="expiryDate" placeholder="Expiry Date" value={form.expiryDate} onChange={handleInputChange} />
        <Input type="text" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleInputChange} />
        {isEditing ? (
          <AddButton onClick={handleSave}>Save Changes</AddButton>
        ) : (
          <AddButton onClick={handleAdd}>Add Medicine Stock</AddButton>
        )}
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Expiry Date</Th>
            <Th>Quantity</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <Td>{row.id}</Td>
              <Td>{row.name}</Td>
              <Td>{row.type}</Td>
              <Td>{row.price}</Td>
              <Td>{row.expiryDate}</Td>
              <Td>{row.quantity}</Td>
              <Td>
                <ButtonContainer>
                  <EditButton onClick={() => handleEdit(row)}>Update</EditButton>
                  <DeleteButton onClick={() => handleDelete(row.id)}>Delete</DeleteButton>
                </ButtonContainer>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicineInventory;
