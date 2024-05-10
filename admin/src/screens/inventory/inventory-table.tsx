"use client"

import React, { useState } from 'react';
import Layout from "../../layouts/layout";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TablePagination 
} from '@mui/material';

interface InventoryItem {
  productName: string;
  category: string;
  quantity: number;
  size: string;
  color: string;
}

const inventoryData: InventoryItem[] = [
  { productName: "Air Max", category: "Sneakers", quantity: 20, size: "S", color: "Black" },
  { productName: "Yoga Mat", category: "Sports", quantity: 40, size: "L", color: "White" },
  { productName: "T-shirt", category: "Fashion", quantity: 60, size: "M", color: "Red" },
];

const Inventory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "80px" }}>
        <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold" }}>Inventory</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple inventory table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.color}</TableCell>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={inventoryData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Layout>
  );
};

export default Inventory;
