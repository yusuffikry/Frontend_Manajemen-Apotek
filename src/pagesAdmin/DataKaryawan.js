// src/pages/DataKaryawan.js
import React from 'react';
import styled from 'styled-components';

const DataKaryawanContainer = styled.div`
  padding: 2rem;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem auto;  /* Centers the form */
  max-width: 1380px;  /* Sets the maximum width of the form */
  width: 100%;
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

const TableContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
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
  justify-content: center;
  gap: 0.5rem;
`;

const DataKaryawan = () => {
  const data = [
    { name: 'Ryujin', address: 'Makassar', phone: '085362693671' },
    { name: 'Yuta', address: 'Gowa', phone: '085362689790' },
    { name: 'Rika', address: 'Malino', phone: '085362693699' },
    { name: 'Yufi', address: 'Pare-pare', phone: '083212693671' },
    { name: 'Zabrina', address: 'Kalimantan', phone: '085362693873' },
    { name: 'Lisa', address: 'Jakarta', phone: '085361433671' }
  ];

  return (
    <DataKaryawanContainer>
      <FormContainer>
        <h2>Mengelola Data Karyawan</h2>
        <Input type="text" placeholder="Nama" />
        <Input type="text" placeholder="Alamat" />
        <Input type="text" placeholder="Nomor Telepon" />
        <Button>Tambah Karyawan</Button>
      </FormContainer>
      
      <h3>Daftar Karyawan</h3>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Nomor HP</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.address}</td>
                <td>{row.phone}</td>
                <td>
                  <ButtonContainer>
                    <Button>Hapus</Button>
                  </ButtonContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </DataKaryawanContainer>
  );
};

export default DataKaryawan;
