import React from 'react';
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
  max-width: 600px; /* Contoh atur lebar maksimum menjadi 600px */
  width: 100%; /* Agar FormContainer mengisi lebar kontainer induk */
`;

const Input = styled.input`
  width: 100%; /* Menggunakan lebar 100% agar mengisi seluruh kontainer */
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const DataPemasok = () => {
  const data = [
    { id: 1, nama: 'Yuta', jenis: 'Tablet', merek: 'Rp20.000', tanggal: '14 Jan, 10.40 PM', jumlah: 450 }
  ];

  return (
    <Container>
      <FormContainer>
        <h3>Mengelola Data Pemasok</h3>
        <Input type="text" placeholder="Nama Pemasok" />
        <Input type="text" placeholder="Jenis Obat" />
        <Input type="text" placeholder="Merek Obat" />
        <Input type="text" placeholder="Tanggal di Pasok" />
        <Input type="text" placeholder="Jumlah Obat" />
        <AddButton>Tambah</AddButton>
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nama</Th>
            <Th>Jenis</Th>
            <Th>Merek</Th>
            <Th>Tanggal</Th>
            <Th>Jumlah</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <Td>{row.id}</Td>
              <Td>{row.nama}</Td>
              <Td>{row.jenis}</Td>
              <Td>{row.merek}</Td>
              <Td>{row.tanggal}</Td>
              <Td>{row.jumlah}</Td>
              <Td>
                <ButtonContainer>
                  <EditButton>Edit</EditButton>
                  <DeleteButton>Hapus</DeleteButton>
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
