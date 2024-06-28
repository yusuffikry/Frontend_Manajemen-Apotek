import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  margin: 0rem 0 0.25rem;
  color: white;
`;

const flexStyle = {
  display: 'flex',
};

const flexGrowStyle = {
  flexGrow: 1,
};

const SalesTransactions = () => {
  const [data, setData] = useState([]);
  const [selectedObat, setSelectedObat] = useState([]);
  const [listObat, setListObat] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [total,setTotal] = useState(0);
  const [newTransaction, setNewTransaction] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState();

  const fetchTransaksi = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/transaksi", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  

  useEffect(() => {
    fetchTransaksi();
    fetchObat();
    fetchCurrentUser();
  }, []);

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

  const fetchCurrentUser = async () => {
    await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      setUser(res.data);
      
    }).catch((err) => {
      console.error("Error fetching current user:", err);
    })

  }

  // const [selectedItemDetail, setSelectedItemDetail] = useState(null);

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
      setEditingTransaction(response.data); // Set data transaksi terpilih
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  useEffect(() => {
    // console.log(editingTransaction);
    // if(editingTransaction != null) setTotal(editingTransaction.details.reduce((acc, item) => acc + item.jumlah_beli * item.harga_satuan, 0));
    if(selectedObat != null) setTotal(selectedObat.reduce((acc, item) => acc + item.jumlah_beli * item.harga_satuan, 0));
    console.log(total);
  }, [selectedObat]);
  
  useEffect(() => {
    if(editingTransaction == null) return
    console.log(editingTransaction);
    if(editingTransaction != null) setTotal(editingTransaction.details.reduce((acc, item) => acc + item.jumlah_beli * item.harga_satuan, 0));
    setShowForm(true);
  }, [editingTransaction])

  const handleDelete = async (transaction) => {
    if (window.confirm(`Are you sure you want to delete the transaction with ID: ${transaction.id_transaksi_penjualan}?`)) {
      await axios.delete(`http://localhost:8000/api/transaksi/${transaction.id_transaksi_penjualan}`, {headers : {Authorization: `Bearer ${localStorage.getItem("token")}`}});
      setSelectedTransaction(null); 
      setEditingTransaction(null);
      fetchTransaksi(); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
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
          "total_pembayaran": total
        }, 
        "details" : 
          editingTransaction.details.map(obat => ({
            id_obat: obat.id_obat,
            jumlah_beli: parseInt(obat.jumlah_beli), // pastikan jumlah_beli diubah menjadi number jika perlu
            harga_satuan: obat.harga_satuan || 0
          }))
        }
        await axios.put(
          `http://localhost:8000/api/transaksi/${id_detail}` ,
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
      const transaksi = {
        "transaksi": {
          "tanggal_transaksi": currentDate,
          "total_pembayaran": total
        }, 
        "details" : 
          selectedObat.map(obat => ({
            id_obat: obat.id_obat,
            jumlah_beli: parseInt(obat.jumlah_beli), // pastikan jumlah_beli diubah menjadi number jika perlu
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
      // console.log(transaksi);
      setSelectedObat(null)
    }
    fetchTransaksi();
    setShowForm(false); 
  };

  const handleSelected = () => {
    if(editingTransaction){
      const id = editingTransaction.id_obat;
      // console.log(editingTransaction.id_obat)
      // console.log(listObat);
      setNewTransaction({});
      const selectedItem = listObat.filter((item) => item.id_obat == id);
      if(editingTransaction.details.find((item) => item.id_obat == id)){
        alert(`Item with id ${id} already exists`);
        return;
      }
      if (selectedItem.length ==0 ) {
      alert(`Item with id ${id} not found`);
      return console.log("Item not found");
      }
      // console.log(selectedItem);
      const newObat = {
        nama_obat: selectedItem[0].nama_obat,
        id_obat: id,
        jumlah_beli: 1,
        harga_satuan: selectedItem[0].harga,
      };
      setEditingTransaction((prevEditingTransaction) => {
        return { ...prevEditingTransaction, details: [...prevEditingTransaction.details, newObat] };
      });
      // console.log(editingTransaction);
    
    } else {
      const id = newTransaction.id_obat;
      // console.log(id);
      // console.log(listObat);
      const selectedItem = listObat.filter((item) => 
        item.id_obat == id
        // console.log(item.id_obat==id);
      );
      // console.log(selectedItem);
      // console.log(id);
      // console.log(newTransaction.id_obat);
      
      if(selectedObat.find((item) => item.id_obat == id)){
        alert(`Item with id ${id} already exists`);
        return;
      }
      if (selectedItem.length ==0 ) {
        alert(`Item with id ${id} not found`);
        return;
      }
      
      const Obat = {
        nama_obat: selectedItem[0].nama_obat,
        id_obat: id,
        jumlah_beli: 1,
        harga_satuan: selectedItem[0].harga, 
      };

      console.log("ini " + Obat.nama_obat);
    
      setSelectedObat(prevSelectedObat => [
        ...prevSelectedObat,
        Obat
      ]);
      console.log(selectedObat);
      // console.log("listObat"+selectedObat.length);
    }
    // console.log(editingTransaction.details);
    
  };

  // useEffect(() => {console.log(newTransaction)}, [newTransaction]);

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setEditingTransaction(null); 
  };

  const handleJumlahBeliChange = (e, index) => {
    const { value } = e.target;
    const updatedObat = [...selectedObat];
    updatedObat[index].jumlah_beli = value;
    setSelectedObat(updatedObat);
    // console.log(value);
  };
  

  const handleCloseForm = () => {
    setShowForm(false);
    setNewTransaction({});
    setEditingTransaction(null);
    setSelectedObat([])
  };

  return (
    <TableContainer>
      {selectedTransaction && (
        <FormContainer>
          <h3>Transaction Details</h3>
          <Label>ID Transaksi: {selectedTransaction.transaksi.id_transaksi_penjualan}</Label>
          <Label>Tanggal Transaksi: {selectedTransaction.transaksi.tanggal_transaksi}</Label>
          <Label>Total Pembayaran: {selectedTransaction.transaksi.total_pembayaran}</Label>
          <Table>
            <thead>
              <tr>
                <th>ID Obat</th>
                <th>Jumlah Beli</th>
                <th>Harga Satuan</th>
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
              <Label htmlFor="nama_obat">Obat</Label>
              <select
                name="id_obat"
                value={newTransaction.id_obat}
                onChange={handleInputChange}
              >
                <option value="">Select Obat</option>
                {listObat.map((row, index) => (
                  <option value={`${row.id_obat}`} key={index}>{row.nama_obat}</option>
                ))}
              </select>
            </div>
            <div>
              <EditButton onClick={handleSelected}> + </EditButton>
            </div>
          </div>
          {editingTransaction && (


              <><Label>ID Transaksi: {editingTransaction.transaksi.id_transaksi_penjualan}</Label><Label>Tanggal Transaksi: {editingTransaction.transaksi.tanggal_transaksi}</Label><Label>Total Pembayaran: {total}</Label><Table>
              <thead>
                <tr>
                  <th>ID Obat</th>
                  <th>Jumlah Beli</th>
                  <th>Harga Satuan</th>
                </tr>
              </thead>
              <tbody>
                {editingTransaction.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{listObat.find(item => item.id_obat == detail.id_obat).nama_obat}</td>
                    <td>{detail.jumlah_beli}</td>
                    <td>{detail.harga_satuan}</td>
                  </tr>
                ))}
              </tbody>
            </Table></>

          )}
          {!editingTransaction && (
          <Table>
            <Label>Total Pembayaran: {total}</Label>
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
          )}
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
              <td>{row.id_transaksi_penjualan}</td>
              <td>{row.tanggal_transaksi}</td>
              <td>{row.total_pembayaran}</td>
              <td>
                <ButtonContainer>
                  <DetailButton onClick={() => handleDetail(row)}>Detail</DetailButton>
                  {user.role === 2 && (
                    <>
                    <EditButton onClick={() => handleEdit(row)}>Update</EditButton>
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
