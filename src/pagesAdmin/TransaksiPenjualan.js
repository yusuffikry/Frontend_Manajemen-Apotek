import React, { useState } from 'react';
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
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AddButton = styled(Button)`
  background-color: #2ecc71;

  &:hover {
    background-color: #27ae60;
  }
`;

const DetailButton = styled(Button)`
  background-color: #3498db;

  &:hover {
    background-color: #2980b9;
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

const DetailContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f4f4f4;
`;

const DetailItem = styled.p`
  margin: 0.5rem 0;
`;

const FormContainer = styled.div`
  width: 50%;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f4f4f4;
`;

const Input = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CloseButton = styled(Button)`
  background-color: #95a5a6;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const TransaksiPenjualan = () => {
  const [data, setData] = useState([
    {
      ID: 'user1',
      tanggal_transaksi: '2024-06-21',
      total_pembayaran: '50000',
      id_obat: 'obat1',
      jumlah_beli: '2',
      harga_satuan: '25000'
    },
    {
      ID: 'user2',
      tanggal_transaksi: '2024-05-21',
      total_pembayaran: '30000',
      id_obat: 'obat2',
      jumlah_beli: '1',
      harga_satuan: '30000'
    },
    // Add more sample data as needed
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    ID: '',
    tanggal_transaksi: '',
    total_pembayaran: '',
    id_obat: '',
    jumlah_beli: '',
    harga_satuan: ''
  });

  const handleDetail = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (transaction) => {
    if (window.confirm(`Are you sure you want to delete the transaction with ID: ${transaction.ID}?`)) {
      const updatedData = data.filter(item => item.ID !== transaction.ID);
      setData(updatedData);
      setSelectedTransaction(null); // Clear selected transaction if any
      setEditingTransaction(null); // Clear editing transaction if any
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTransaction) {
      setEditingTransaction({
        ...editingTransaction,
        [name]: value
      });
    } else {
      setNewTransaction({
        ...newTransaction,
        [name]: value
      });
    }
  };

  const handleSave = () => {
    if (editingTransaction) {
      const updatedData = data.map(item =>
        item.ID === editingTransaction.ID ? editingTransaction : item
      );
      setData(updatedData);
      setEditingTransaction(null);
    } else {
      setData([...data, newTransaction]);
      setNewTransaction({
        ID: '',
        tanggal_transaksi: '',
        total_pembayaran: '',
        id_obat: '',
        jumlah_beli: '',
        harga_satuan: ''
      });
    }
  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  return (
    <TableContainer>
      <h2>Transaksi Penjualan</h2>
      <FormContainer>
        <h3>{editingTransaction ? 'Edit Transaksi' : 'Add New Transaksi'}</h3>
        <Input
          type="text"
          name="ID"
          placeholder="ID"
          value={editingTransaction ? editingTransaction.ID : newTransaction.ID}
          onChange={handleInputChange}
          disabled={editingTransaction}
        />
        <Input
          type="text"
          name="tanggal_transaksi"
          placeholder="Tanggal Transaksi"
          value={editingTransaction ? editingTransaction.tanggal_transaksi : newTransaction.tanggal_transaksi}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="total_pembayaran"
          placeholder="Total Pembayaran"
          value={editingTransaction ? editingTransaction.total_pembayaran : newTransaction.total_pembayaran}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="id_obat"
          placeholder="ID Obat"
          value={editingTransaction ? editingTransaction.id_obat : newTransaction.id_obat}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="jumlah_beli"
          placeholder="Jumlah Beli"
          value={editingTransaction ? editingTransaction.jumlah_beli : newTransaction.jumlah_beli}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="harga_satuan"
          placeholder="Harga Satuan"
          value={editingTransaction ? editingTransaction.harga_satuan : newTransaction.harga_satuan}
          onChange={handleInputChange}
        />
        <ButtonContainer>
          <EditButton onClick={handleSave}>Save</EditButton>
        </ButtonContainer>
      </FormContainer>
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
                  <DetailButton onClick={() => handleDetail(row)}>Detail</DetailButton>
                  <EditButton onClick={() => handleEdit(row)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(row)}>Delete</DeleteButton>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedTransaction && (
        <DetailContainer>
          <h3>Detail Transaksi</h3>
          <DetailItem>ID: {selectedTransaction.ID}</DetailItem>
          <DetailItem>Tanggal Transaksi: {selectedTransaction.tanggal_transaksi}</DetailItem>
          <DetailItem>Total Pembayaran: {selectedTransaction.total_pembayaran}</DetailItem>
          <DetailItem>ID Obat: {selectedTransaction.id_obat}</DetailItem>
          <DetailItem>Jumlah Beli: {selectedTransaction.jumlah_beli}</DetailItem>
          <DetailItem>Harga Satuan: {selectedTransaction.harga_satuan}</DetailItem>
          <ButtonContainer>
            <CloseButton onClick={handleCloseDetail}>Close</CloseButton>
          </ButtonContainer>
        </DetailContainer>
      )}
    </TableContainer>
  );
};

export default TransaksiPenjualan;
