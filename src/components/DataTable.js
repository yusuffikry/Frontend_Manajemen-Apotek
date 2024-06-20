import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
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

const DataTable = () => {
  const data = [
    { name: 'Ryujin', address: 'Makassar', phone: '085362693671' },
    { name: 'Yuta', address: 'Gowa', phone: '085362689790' },
    { name: 'Rika', address: 'Malino', phone: '085362693699' },
    { name: 'Yufi', address: 'Pare-pare', phone: '083212693671' },
    { name: 'Zabrina', address: 'Kalimantan', phone: '085362693873' },
    { name: 'Lisa', address: 'Jakarta', phone: '085361433671' }
  ];

  return (
    <TableContainer>
      <h2>Data Karyawan</h2>
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
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
