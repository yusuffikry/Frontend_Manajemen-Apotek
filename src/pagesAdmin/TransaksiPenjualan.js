import React from 'react';
import styled from 'styled-components';

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
    text-align: center; /* Center align text in all table cells */
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
  justify-content: center; /* Center align buttons horizontally */
  gap: 0.5rem; /* Space between buttons */
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const TransaksiPenjualan = () => {
  const data = [
    { ID: 'user1', tanggal_transaksi: '2024-06-21', total_pembayaran: '0' },
    { ID: 'user2', tanggal_transaksi: '2024-05-21', total_pembayaran: '0' },
    { ID: 'user3', tanggal_transaksi: '2024-04-01', total_pembayaran: '0' },
    { ID: 'user4', tanggal_transaksi: '2024-03-01', total_pembayaran: '0' },
  ];

  return (
    <TableContainer>
      <h2>Transaksi Penjualan</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tanggal Transaksi</th>
            <th>Total Pembayaran</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.ID}</td>
              <td>{row.tanggal_transaksi}</td>
              <td>{row.total_pembayaran}</td>
              <td>
                <ButtonContainer>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TransaksiPenjualan;
