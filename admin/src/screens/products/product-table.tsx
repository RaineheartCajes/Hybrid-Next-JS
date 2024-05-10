"use client"

import React, { useState } from 'react';
import Layout from "../../layouts/layout";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, MenuItem, TablePagination
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface Product {
  productName: string;
  category: string;
  size: string;
  color: string;
  price: number;
  description?: string;
}

const productsData: Product[] = [
  { productName: "Air Max", category: "Sneakers", size: "S", color: "Black", price: 199 },
  { productName: "Air Jordan 22", category: "Sports", size: "L", color: "White", price: 299 },
  { productName: "Air Force 1", category: "Sneakers", size: "M", color: "Red", price: 399 },
  { productName: "Kyrie 5", category: "Sports", size: "L", color: "Black", price: 499 },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({ productName: '', category: '', size: '', color: '', price: 0, description: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "55px" }}>
        <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold"}}>Products</h1>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpen} style={{ marginBottom: 20, marginLeft: "auto", marginRight:"10px" }}>
          Add Product
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={productsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Product Name" name="productName" margin="dense" onChange={handleChange} />
          <TextField fullWidth select label="Category" name="category" margin="dense" onChange={handleChange} value={newProduct.category}>
            {['Sneakers', 'Sports', 'Fashion'].map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Size" name="size" margin="dense" onChange={handleChange} />
          <TextField fullWidth label="Color" name="color" margin="dense" onChange={handleChange} />
          <TextField fullWidth label="Price" name="price" type="number" margin="dense" onChange={handleChange} />
          <TextField fullWidth label="Description" name="description" margin="dense" multiline rows={4} onChange={handleChange} />
          <Button variant="contained" component="label" style={{ marginTop: 10 }}>
            Upload Image
            <input type="file" hidden />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Products;
