import React from 'react';
import Layout from "../../layouts/layout";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';


interface Product {
  productName: string;
  category: string;
  quantity: number;
}


const productsData: Product[] = [
  { productName: "Air Max", category: "Sneakers", quantity: 15 },
  { productName: "Lebron 19", category: "Sports", quantity: 30 },
  { productName: "Jordan 1 low", category: "Sneakers", quantity: 50 },
  { productName: "Jordan 1 low", category: "Sneakers", quantity: 50 },
  { productName: "Jordan 1 low", category: "Sneakers", quantity: 50 },
 
];

const Products = () => {
  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "60px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.map((product, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.productName}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
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
      </TableContainer>
    </Layout>
  );
};

export default Products;
