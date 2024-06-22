import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px; /* Contoh atur lebar maksimum menjadi 600px */
  width: 100%; /* Agar FormContainer mengisi lebar kontainer induk */
`;

const Input = styled.input`
  width: 100%; /* Menggunakan lebar 100% agar mengisi seluruh kontainer */
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 50%;
  padding: 0.5rem;
  margin: 1rem 0;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin: 2rem auto;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const StokObat = () => {
  return (
    <Container>
      <FormContainer>
      <h2>Mengelola Stok Obat</h2>
        <Input type="text" placeholder="Nama obat" />
        <Input type="text" placeholder="Jenis Obat" />
        <Input type="text" placeholder="Harga" />
        <Input type="text" placeholder="Tanggal Kadaluwarsa" />
        <Input type="text" placeholder="Jumlah Obat" />
        <Button>Tambah Stok Obat</Button>
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Jenis</Th>
            <Th>Harga</Th>
            <Th>Tanggal</Th>
            <Th>Jumlah</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>1</Td>
            <Td>Yuta</Td>
            <Td>Tablet</Td>
            <Td>Rp20.000</Td>
            <Td>14 Jan, 10.40 PM</Td>
            <Td>450</Td>
            <Td><button>🗑️</button></Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default StokObat;
