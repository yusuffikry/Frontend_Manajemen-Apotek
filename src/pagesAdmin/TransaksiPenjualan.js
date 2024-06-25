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

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align button to the right */
  margin: 1rem 0;
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
  width: 40%;
  margin: 1rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DetailTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const DetailItem = styled.p`
  margin: 1.2rem 0;
  color: #555;
  position: relative;

  /* Underline effect */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: -0.2rem; /* Adjust as needed */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ddd;
  }
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const FormContainer = styled.div`
  background-color: #467aa4;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  max-width: 600px;
  width: 100%;
  text-align: center; /* Center text inside the container */
`;

const Input = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Label = styled.label`
  width: 100%;
  text-align: left;
  margin: 0rem 0 0.25rem;
  color: white;
`;

const CloseButton = styled(Button)`
  background-color: #95a5a6;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const SalesTransactions = () => {
  const [data, setData] = useState([
    {
      ID: 'user1',
      transaction_date: '2024-06-21',
      total_payment: '50000',
      medicine_id: 'Medicine1',
      quantuty_purchased: '2',
      unit_price: '25000'
    },
    {
      ID: 'user2',
      transaction_date: '2024-05-21',
      total_payment: '30000',
      medicine_id: 'Medicine2',
      quantuty_purchased: '1',
      unit_price: '30000'
    },
    // Add more sample data as needed
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    ID: '',
    transaction_date: '',
    total_payment: '',
    medicine_id: '',
    quantuty_purchased: '',
    unit_price: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleDetail = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
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
        transaction_date: '',
        total_payment: '',
        medicine_id: '',
        quantuty_purchased: '',
        unit_price: ''
      });
    }
    setShowForm(false); // Hide the form after saving
  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setEditingTransaction(null); // Clear any editing transaction data
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewTransaction({
      ID: '',
      transaction_date: '',
      total_payment: '',
      medicine_id: '',
      quantuty_purchased: '',
      unit_price: ''
    });
  };

  return (
    <TableContainer>
      <h2>Sales Transactions</h2>
      {selectedTransaction && (
        <DetailContainer>
          <DetailTitle>Transaction Details</DetailTitle>
          <DetailItem><DetailLabel>ID :</DetailLabel> {selectedTransaction.ID}</DetailItem>
          <DetailItem><DetailLabel>Transaction Date :</DetailLabel> {selectedTransaction.transaction_date}</DetailItem>
          <DetailItem><DetailLabel>Total Payment :</DetailLabel> {selectedTransaction.total_payment}</DetailItem>
          <DetailItem><DetailLabel>Medicine ID :</DetailLabel> {selectedTransaction.medicine_id}</DetailItem>
          <DetailItem><DetailLabel>Quantity Purcashed :</DetailLabel> {selectedTransaction.quantuty_purchased}</DetailItem>
          <DetailItem><DetailLabel>Unit Price :</DetailLabel> {selectedTransaction.unit_price}</DetailItem>
          <ButtonContainer>
            <CloseButton onClick={handleCloseDetail}>Close</CloseButton>
          </ButtonContainer>
        </DetailContainer>
      )}

      {!showForm && ( // Conditionally render the Add button
        <AddButtonContainer>
          <AddButton onClick={handleShowForm}>Add New Transaction</AddButton>
        </AddButtonContainer>
      )}
      {showForm && (
        <FormContainer>
          <h3>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <Label htmlFor="ID">ID</Label>
          <Input
            id="ID"
            type="text"
            name="ID"
            placeholder="ID"
            value={editingTransaction ? editingTransaction.ID : newTransaction.ID}
            onChange={handleInputChange}
            disabled={editingTransaction}
          />
          <Label htmlFor="transaction_date">Transaction Date</Label>
          <Input
            id="transaction_date"
            type="text"
            name="transaction_date"
            placeholder="Transaction Date"
            value={editingTransaction ? editingTransaction.transaction_date : newTransaction.transaction_date}
            onChange={handleInputChange}
          />
          <Label htmlFor="total_payment">Total Payment</Label>
          <Input
            id="total_payment"
            type="text"
            name="total_payment"
            placeholder="Total Payment"
            value={editingTransaction ? editingTransaction.total_payment : newTransaction.total_payment}
            onChange={handleInputChange}
          />
          <Label htmlFor="medicine_id">Medicine ID</Label>
          <Input
            id="medicine_id"
            type="text"
            name="medicine_id"
            placeholder="Medicine ID"
            value={editingTransaction ? editingTransaction.medicine_id : newTransaction.medicine_id}
            onChange={handleInputChange}
          />
          <Label htmlFor="quantuty_purchased">Quantity Purchased</Label>
          <Input
            id="quantuty_purchased"
            type="text"
            name="quantuty_purchased"
            placeholder="Quantity Purcashed"
            value={editingTransaction ? editingTransaction.quantuty_purchased : newTransaction.quantuty_purchased}
            onChange={handleInputChange}
          />
          <Label htmlFor="unit_price">Unit Price</Label>
          <Input
            id="unit_price"
            type="text"
            name="unit_price"
            placeholder="Unit Price"
            value={editingTransaction ? editingTransaction.unit_price : newTransaction.unit_price}
            onChange={handleInputChange}
          />
          <ButtonContainer>
            <EditButton onClick={handleSave}>Save</EditButton>
            <CloseButton onClick={handleCloseForm}>Cancel</CloseButton>
          </ButtonContainer>
        </FormContainer>
      )}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Transaction Date</th>
            <th>Total Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.ID}</td>
              <td>{row.transaction_date}</td>
              <td>{row.total_payment}</td>
              <td>
                <ButtonContainer>
                  <DetailButton onClick={() => handleDetail(row)}>Detail</DetailButton>
                  <EditButton onClick={() => handleEdit(row)}>Update</EditButton>
                  <DeleteButton onClick={() => handleDelete(row)}>Delete</DeleteButton>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default SalesTransactions;
