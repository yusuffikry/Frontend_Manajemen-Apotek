import React from 'react';
import styled from 'styled-components';

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

const DataTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Nama</Th>
          <Th>Alamat</Th>
          <Th>Nomor HP</Th>
          <Th>Aksi</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Ryujin</Td>
          <Td>Makassar</Td>
          <Td>085362693671</Td>
          <Td>...</Td>
        </tr>
        <tr>
          <Td>Yuta</Td>
          <Td>Gowa</Td>
          <Td>085362689790</Td>
          <Td>...</Td>
        </tr>
        <tr>
          <Td>Rika</Td>
          <Td>Malino</Td>
          <Td>085362693699</Td>
          <Td>...</Td>
        </tr>
        <tr>
          <Td>Yufi</Td>
          <Td>Pare-pare</Td>
          <Td>083212693671</Td>
          <Td>...</Td>
        </tr>
        <tr>
          <Td>Zabrina</Td>
          <Td>Kalimantan</Td>
          <Td>085362693873</Td>
          <Td>...</Td>
        </tr>
        <tr>
          <Td>Lisa</Td>
          <Td>Jakarta</Td>
          <Td>085361433671</Td>
          <Td>...</Td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DataTable;
