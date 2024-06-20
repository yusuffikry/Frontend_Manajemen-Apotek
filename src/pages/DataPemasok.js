import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
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
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
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

const DataPemasok = () => {
  return (
    <Container>
      <FormContainer>
      <h2>Mengelola Data Pemasok</h2>
        <Input type="text" placeholder="Nama Pemasok" />
        <Input type="text" placeholder="Jenis Obat" />
        <Input type="text" placeholder="Merek Obat" />
        <Input type="text" placeholder="Tanggal di Pasok" />
        <Input type="text" placeholder="Jumlah Obat" />
        <Button>Tambah Stok Obat</Button>
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Jenis</Th>
            <Th>Merek</Th>
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
          {/* Tambahkan baris lainnya sesuai kebutuhan */}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataPemasok;
