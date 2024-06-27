import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const [data, setData] = useState([]);

  const fetchObat = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/obat", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching obat:", error);
    }
  };

  useEffect(() => {
    fetchObat();
  }, []);

  const [form, setForm] = useState({
    nama_obat: '',
    jenis_obat: '',
    harga: '',
    jumlah_stok: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/obat/",
        {
          nama_obat: form.nama_obat,
          jenis_obat: form.jenis_obat,
          harga: form.harga,
          jumlah_stok: form.jumlah_stok,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData([...data, response.data]);
      setForm({ nama_obat: '', jenis_obat: '', harga: '', jumlah_stok: '' });
    } catch (error) {
      console.error("Error adding obat:", error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!form.id) {
      console.error("No ID provided for the update");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/obat/${form.id}`,
        {
          nama_obat: form.nama_obat,
          jenis_obat: form.jenis_obat,
          harga: form.harga,
          jumlah_stok: form.jumlah_stok,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(data.map(item => (item.id === form.id ? response.data : item)));
      setForm({ nama_obat: '', jenis_obat: '', harga: '', jumlah_stok: '' });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating obat:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("No ID provided for the delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete the medicine with ID ${id}?`)) {
      try {
        await axios.delete(
          `http://localhost:8000/api/obat/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(data.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting obat:", error);
      }
    }
  };

  return (
    <Container>
      <FormContainer>
        <h3>Managing Medicine Inventory</h3>
        <Input type="text" name="nama_obat" placeholder="Medicine Name" value={form.nama_obat} onChange={handleInputChange} />
        <Input type="text" name="jenis_obat" placeholder="Medicine Type" value={form.jenis_obat} onChange={handleInputChange} />
        <Input type="text" name="harga" placeholder="Price" value={form.harga} onChange={handleInputChange} />
        <Input type="text" name="jumlah_stok" placeholder="Quantity" value={form.jumlah_stok} onChange={handleInputChange} />
        {isEditing ? (
          <EditButton onClick={handleSave}>Save Changes</EditButton>
        ) : (
          <AddButton onClick={handleAdd}>Add Medicine Stock</AddButton>
        )}
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <Td>{row.nama_obat}</Td>
              <Td>{row.jenis_obat}</Td>
              <Td>{row.harga}</Td>
              <Td>{row.jumlah_stok}</Td>
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
