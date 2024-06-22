import React from 'react';
import styled from 'styled-components';

const DataKaryawanContainer = styled.div`
  padding: 2rem;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
  padding: 3.5rem;
  border-radius: 10px;
  margin: 1rem auto;  /* Centers the form */
  max-width: 1000px;  /* Sets the maximum width of the form */
  width: 100%;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 20px); /* Adjusted width */
  padding: 0.5rem;
  margin: 1.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 0;
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
  margin: 0 auto; /* Center align */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem; /* Adjusted margin */
`;

const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

const TableCell = styled.th`
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCellBody = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 30%; /* Sesuaikan dengan lebar yang diinginkan */
  margin: 0 auto; /* Auto margin untuk memposisikan secara horizontal di tengah */
`;

const Title = styled.h2`
  text-align: center; /* Center align the title */
  margin-top: 0rem; /* Adjust margin top */
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
        <Title>Mengelola Data Karyawan</Title>
        <Input type="text" placeholder="Nama" />
        <Input type="text" placeholder="Alamat" />
        <Input type="text" placeholder="Nomor Telepon" />
        <Button>Tambah Karyawan</Button>
      </FormContainer>
      
      <TableContainer>
        <h2>Daftar Karyawan</h2>
        <Table>
          <TableHead>
            <tr>
              <TableCell>Nama</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Nomor HP</TableCell>
              <TableCell>Aksi</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCellBody>{row.name}</TableCellBody>
                <TableCellBody>{row.address}</TableCellBody>
                <TableCellBody>{row.phone}</TableCellBody>
                <TableCellBody>
                  <ButtonContainer>
                    <Button>Hapus</Button>
                  </ButtonContainer>
                </TableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DataKaryawanContainer>
  );
};

export default DataKaryawan;
