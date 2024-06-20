import React from 'react';
import styled from 'styled-components';
import Form from '../components/Form';
import DataTable from '../components/DataTable';

const DataKaryawanContainer = styled.div`
  padding: 2rem;
`;

const DataKaryawan = () => {
  return (
    <DataKaryawanContainer>
      <h2>Data Karyawan</h2>
      <Form />
      <h3>Daftar Karyawan</h3>
      <DataTable />
    </DataKaryawanContainer>
  );
};

export default DataKaryawan;
