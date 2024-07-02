import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { loadToken } from '../utils';

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
  background-color: #1abc9c;
  margin-top: 1rem;

  &:hover {
    background-color: #16a085;
  }
`;

const ClearButton = styled(Button)`
  background-color: #95a5a6;
  margin-top: 1rem;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const SaveButton = styled(Button)`
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

const FormButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const MedicineInventory = () => {
  const [data, setData] = useState([]);

  const fetchObat = async () => {
    try {
      await loadToken();
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
    id: '',
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
    const { nama_obat, jenis_obat, harga, jumlah_stok } = form;

    if (!nama_obat || !jenis_obat || !harga || !jumlah_stok) {
      alert("All fields must be filled!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/obat/",
        {
          nama_obat,
          jenis_obat,
          harga,
          jumlah_stok,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData([...data, response.data]);
      setForm({ id: '', nama_obat: '', jenis_obat: '', harga: '', jumlah_stok: '' });
      alert('Medicine stock added successfully!');
    } catch (error) {
      console.error("Error adding obat:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id_obat, 
      nama_obat: item.nama_obat,
      jenis_obat: item.jenis_obat,
      harga: item.harga,
      jumlah_stok: item.jumlah_stok
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const { id, nama_obat, jenis_obat, harga, jumlah_stok } = form;

    if (!id || !nama_obat || !jenis_obat || !harga || !jumlah_stok) {
      alert("All fields must be filled!");
      return;
    }

    if (parseInt(jumlah_stok) <= 0 || parseFloat(harga) <= 0) {
      alert("Data must be greater than zero!");
      return;
    }
  

    try {
      const response = await axios.put(
        `http://localhost:8000/api/obat/${id}`,
        {
          nama_obat,
          jenis_obat,
          harga,
          jumlah_stok,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(data.map(item => (item.id_obat === id ? response.data : item)));
      setForm({ id: '', nama_obat: '', jenis_obat: '', harga: '', jumlah_stok: '' });
      setIsEditing(false);
      alert('Medicine stock updated successfully!');
    } catch (error) {
      console.error("Error updating obat:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("No ID provided for the delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete this?`)) {
      try {
        await axios.delete(
          `http://localhost:8000/api/obat/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(data.filter(item => item.id_obat !== id));
        alert('Medicine stock deleted successfully!');
      } catch (error) {
        console.error("Error deleting obat:", error);
      }
    }
  };

  const handleClear = () => {
    setForm({ id: '', nama_obat: '', jenis_obat: '', harga: '', jumlah_stok: '' });
    setIsEditing(false);
  };

  return (
    <Container>
      <FormContainer>
        <h3>Managing Medicine Inventory</h3>
        <Input type="text" name="nama_obat" placeholder="Medicine Name" value={form.nama_obat} onChange={handleInputChange} />
        <Input type="text" name="jenis_obat" placeholder="Medicine Type" value={form.jenis_obat} onChange={handleInputChange} />
        <Input type="text" name="harga" placeholder="Price" value={form.harga} onChange={handleInputChange} />
        <Input type="text" name="jumlah_stok" placeholder="Quantity" value={form.jumlah_stok} onChange={handleInputChange} />
        <FormButtonContainer>
          {isEditing ? (
            <SaveButton onClick={handleSave}>Save</SaveButton>
          ) : (
            <AddButton onClick={handleAdd}>Add</AddButton>
          )}
          <ClearButton onClick={handleClear}>Clear</ClearButton>
        </FormButtonContainer>
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
                  <DeleteButton onClick={() => handleDelete(row.id_obat)}>Delete</DeleteButton>
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
