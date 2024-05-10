import React from 'react';
import Layout from "../../layouts/layout";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


interface InventoryItem {
  productName: string;
  category: string;
  quantity: number;
}


const inventoryData: InventoryItem[] = [
  { productName: "Air Max", category: "Sneakers", quantity: 20 },
  { productName: "Yoga Mat", category: "Sports", quantity: 40 },
  { productName: "T-shirt", category: "Fashion", quantity: 60 },
  
];

const Inventory = () => {
  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "60px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple inventory table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.productName}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Inventory;
