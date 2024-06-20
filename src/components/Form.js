import React from 'react';
import styled from 'styled-components';

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

const Form = () => {
  return (
    <FormContainer>
      <h2>Mengelola Data Karyawan</h2>
      <Input type="text" placeholder="Nama" />
      <Input type="text" placeholder="Alamat" />
      <Input type="text" placeholder="Nomor Telepon" />
      <Button>Tambah Pelanggan</Button>
    </FormContainer>
  );
};

export default Form;
