import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { loadToken } from '../utils';
import { AuthContext } from '../AuthContext';

const TableContainer = styled.div`
  width: 75%;
  margin: 2rem auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: center;
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

const StatusText = styled.span`
  color: ${props => props.color || 'black'};
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
  background-color: #E7F0DC;
  color: ${props => props.color || 'black'};

  &:hover {
    background-color: #16a085;
  }
`;

const SaveButton = styled(EditButton)`
  background-color: #1abc9c;
  color: ${props => props.color || 'white'}; /* Default color is white */

  &:hover {
    background-color: #16a085;
  }
`;

const AddObatButton = styled(Button)`
  background-color: #1abc9c;
    margin-top: 1.7rem;

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

const CloseButton = styled(Button)`
  background-color: #95a5a6;

  &:hover {
    background-color: #7f8c8d;
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

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: -0.2rem;
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
  align-items: center;
  max-width: 600px;
  width: 100%;
  text-align: center;
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
  margin-bottom: -0.5rem;
  margin-top: 1rem;
  color: white;
`;

const Select = styled.select`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const flexStyle = {
  display: 'flex',
};

const flexGrowStyle = {
  flexGrow: 1,
};

const SalesTransactions = () => {

  const { isAuthenticated } = useContext(AuthContext);

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

  const [data, setData] = useState([]);
  const [selectedObat, setSelectedObat] = useState([]);
  const [listObat, setListObat] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [total, setTotal] = useState(0);
  const [newTransaction, setNewTransaction] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchTransaksi();
    fetchObat();
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(user)
  }, []);

  useEffect(() => {
    if (selectedObat != null) setTotal(selectedObat.reduce((acc, item) => acc + item.jumlah_beli * item.harga_satuan, 0));
    console.log(total);
  }, [selectedObat]);

  useEffect(() => {
    if (editingTransaction == null) return
    console.log(editingTransaction);
    if (editingTransaction != null) setTotal(editingTransaction.details.reduce((acc, item) => acc + item.jumlah_beli * item.harga_satuan, 0));
    setShowForm(true);
  }, [editingTransaction])


  const fetchTransaksi = async () => {
    try {
      await loadToken();
      const response = await axios.get("http://localhost:8000/api/transaksi", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchObat = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/obat", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListObat(response.data);
    } catch (error) {
      console.error("Error fetching obat:", error);
    }
  };



  const handleDetail = async (transaction) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transaksi/details/${transaction.id_transaksi_penjualan}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedTransaction(response.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  const handleEdit = async (transaction) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transaksi/details/${transaction.id_transaksi_penjualan}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data)
      setEditingTransaction(response.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };



  const handleDelete = async (transaction) => {
    if (window.confirm(`Are you sure you want to delete the transaction?`)) {
      try {
        await axios.delete(
          `http://localhost:8000/api/transaksi/${transaction.id_transaksi_penjualan}`,
          { 
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            } 
          }
        );
        setSelectedTransaction(null);
        setEditingTransaction(null);
        fetchTransaksi();
        
        // Menampilkan alert bahwa transaksi telah berhasil dihapus
        alert('Transaction deleted successfully!');
      } catch (error) {
        console.error('Error deleting transaction:', error);
        // Menampilkan alert atau pesan kesalahan jika ada masalah saat menghapus transaksi
        alert('Failed to delete transaction. Please try again.');
      }
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

  const handleSave = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (editingTransaction) {
      const id_detail = editingTransaction.transaksi.id_transaksi_penjualan;
      const transaksi = {
        "transaksi": {
          "tanggal_transaksi": editingTransaction.transaksi.tanggal_transaksi,
          "total_pembayaran": total,
          "status": 1
        },
        "details":
          editingTransaction.details.map(obat => ({
            id_obat: obat.id_obat,
            jumlah_beli: parseInt(obat.jumlah_beli),
            harga_satuan: obat.harga_satuan || 0
          }))
      }
      console.log(transaksi)
      await axios.put(
        `http://localhost:8000/api/transaksi/${id_detail}`,
        transaksi
        ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

        }

      );
      setEditingTransaction(null);
    } else {
      if (selectedObat.length < 1) return alert("Please select an item");
      const transaksi = {
        "transaksi": {
          "tanggal_transaksi": currentDate,
          "total_pembayaran": total,
          "status": 1
        },
        "details":
          selectedObat.map(obat => ({
            id_obat: obat.id_obat,
            jumlah_beli: parseInt(obat.jumlah_beli),
            harga_satuan: obat.harga_satuan || 0
          }))
      }
      console.log(transaksi)
      await axios.post(
        "http://localhost:8000/api/transaksi",
        transaksi
        ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewTransaction({});
    }
    setSelectedObat([])
    fetchTransaksi();
    setShowForm(false);
  };

  const handleProcessing = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (editingTransaction) {
      const id_detail = editingTransaction.transaksi.id_transaksi_penjualan;
      const transaksi = {
        "transaksi": {
          "tanggal_transaksi": editingTransaction.transaksi.tanggal_transaksi,
          "total_pembayaran": total,
          "status": 0
        },
        "details":
          editingTransaction.details.map(obat => ({
            id_obat: obat.id_obat,
            jumlah_beli: parseInt(obat.jumlah_beli),
            harga_satuan: obat.harga_satuan || 0
          }))
      }
      await axios.put(
        `http://localhost:8000/api/transaksi/${id_detail}`,
        transaksi
        ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditingTransaction(null);
    } else {

      if (selectedObat.length < 1) return alert("Please select an item");
      const transaksi = {
        "transaksi": {
          "tanggal_transaksi": currentDate,
          "total_pembayaran": total,
          "status": 0
        },
        "details":
          selectedObat.map(obat => ({
            id_obat: obat.id_obat,
            jumlah_beli: parseInt(obat.jumlah_beli),
            harga_satuan: obat.harga_satuan || 0
          }))
      }
      console.log(transaksi)
      await axios.post(
        "http://localhost:8000/api/transaksi",
        transaksi
        ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedObat([])
    }
    fetchTransaksi();
    setShowForm(false);
  };

  const handleSelected = () => {
    if (editingTransaction) {
      const id = editingTransaction.id_obat;

      const updatedDetails = [...editingTransaction.details];

      console.log(updatedDetails)

      const selectedItem = listObat.filter((item) => item.id_obat == id);
      if (updatedDetails.find((item) => item.id_obat == id)) {
        alert(`Item with id ${id} already exists`);
        return;
      }

      // console.log(updatedDetails.length)
      if (selectedItem.length < 1) {
        alert(`Item with id ${id} not found`);
        return console.log("Item not found");
      }
      const newObat = {
        nama_obat: selectedItem[0].nama_obat,
        id_obat: id,
        jumlah_beli: 1,
        harga_satuan: selectedItem[0].harga,
      };

      console.log(newObat)

      updatedDetails.push(newObat)
      console.log(updatedDetails)

      setEditingTransaction((prevEditingTransaction) => {
        return { ...prevEditingTransaction, details: updatedDetails };
      });

    } else {
      const id = newTransaction.id_obat;
      const selectedItem = listObat.filter((item) =>
        item.id_obat == id
      );

      if (selectedObat.find((item) => item.id_obat == id)) {
        alert(`Item with id ${id} already exists`);
        return;
      }
      if (selectedItem.length == 0) {
        alert(`Item with id ${id} not found`);
        return;
      }

      const Obat = {
        nama_obat: selectedItem[0].nama_obat,
        id_obat: id,
        jumlah_beli: 1,
        harga_satuan: selectedItem[0].harga,
      };

      // console.log("ini " + Obat.nama_obat);

      setSelectedObat(prevSelectedObat => [
        ...prevSelectedObat,
        Obat
      ]);

    }

  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setEditingTransaction(null);
  };

  const handleJumlahBeliChange = (e, index, isEditing) => {
    const { value } = e.target;
    if (isEditing) {
      const updatedDetails = [...editingTransaction.details];
      updatedDetails[index].jumlah_beli = value;
      setEditingTransaction((prevEditingTransaction) => {
        return { ...prevEditingTransaction, details: updatedDetails };
      });
    } else {
      const updatedObat = [...selectedObat];
      updatedObat[index].jumlah_beli = value;

      setSelectedObat(updatedObat);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewTransaction({});
    setEditingTransaction(null);
    setSelectedObat([])
  };

  return (
    <TableContainer>
      {selectedTransaction && !editingTransaction && (
        <FormContainer>
          <h3>Transaction Details</h3>
          <Label>ID Transaction: {selectedTransaction.transaksi.id_transaksi_penjualan}</Label>
          <Label>Transaction Date: {selectedTransaction.transaksi.tanggal_transaksi}</Label>
          <Label>Total Payment: {selectedTransaction.transaksi.total_pembayaran}</Label>
          <Table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity Purchased</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedTransaction.details.map((detail, index) => (
                <tr key={index}>
                  <td>{listObat.find(item => item.id_obat == detail.id_obat).nama_obat}</td>
                  <td>{detail.jumlah_beli}</td>
                  <td>{detail.harga_satuan}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CloseButton onClick={handleCloseDetail}>Close</CloseButton>
        </FormContainer>
      )}


      {!showForm && (
        <AddButtonContainer>
          <AddButton onClick={handleShowForm}>Add New Transaction</AddButton>
        </AddButtonContainer>
      )}

      {showForm && (
        <FormContainer>
          <h3>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <div style={flexStyle}>
            <div style={flexGrowStyle}>
              <Label htmlFor="obat">Select Medicine:</Label>
              <Select name="id_obat" onChange={handleInputChange}>
                <option value="">Select Medicine</option>
                {listObat.map((obat) => (
                  <option key={obat.id_obat} value={obat.id_obat}>
                    {obat.nama_obat}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <AddObatButton onClick={handleSelected}> + </AddObatButton>
            </div>
          </div>
          {editingTransaction && (
            <>
              <Label>ID Transaction : {editingTransaction.transaksi.id_transaksi_penjualan}</Label>
              <Label>Transaction Date : {editingTransaction.transaksi.tanggal_transaksi}</Label>
              <Label>Total Payment : {total}</Label>
              <Table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Quantity Purchased</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {editingTransaction.details.map((detail, index) => (
                    <tr key={index}>
                      <td>{listObat.find(item => item.id_obat == detail.id_obat).nama_obat}</td>
                      <td>
                        <input
                          name="jumlah_beli"
                          type="number"
                          value={detail.jumlah_beli}
                          onChange={(e) => handleJumlahBeliChange(e, index, true)}
                        />
                      </td>
                      <td>{detail.harga_satuan}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {!editingTransaction && (
            <><Label>Total Payment : {total}</Label>
              <Table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Quantity Purchased</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedObat ? (
                    selectedObat.map((row, index) => (
                      <tr key={index}>
                        <td>{row.nama_obat}</td>
                        <td>
                          <input
                            name="jumlah_beli"
                            type="number"
                            value={row.jumlah_beli}
                            onChange={(e) => handleJumlahBeliChange(e, index)}
                          />
                        </td>
                        <td>{row.harga_satuan}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No items selected</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          )}
          <ButtonContainer>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <EditButton onClick={handleProcessing}>On Proccess</EditButton>
            <CloseButton onClick={handleCloseForm}>Cancel</CloseButton>
          </ButtonContainer>
        </FormContainer>
      )}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Date</th>
            <th>Total Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.tanggal_transaksi}</td>
              <td>{row.total_pembayaran}</td>
              <td>
                {row.status === 1 ? (
                  <StatusText color="green">Done</StatusText>
                ) : (
                  <StatusText color="red">On Process</StatusText>
                )}
              </td>

              <td>
                <ButtonContainer>
                  <DetailButton onClick={() => handleDetail(row)}>Detail</DetailButton>
                  {(user.role === 2 || (user.role === 1 && row.status === 0)) && (
                    <>
                      <EditButton onClick={() => handleEdit(row)} disabled={row.status === 1}>Update
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(row)}>Delete</DeleteButton>
                    </>
                  )}
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
