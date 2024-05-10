import React from 'react';
import Layout from "../../layouts/layout";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';


interface Order {
  fullName: string;
  productName: string;
  shippingAddress: string;
  amount: string;
  status: string;
}


const ordersData: Order[] = [
  { fullName: "Jane Doe", productName: "Air Max", shippingAddress: "123 Elm St, Anytown, AN", amount: "$199.99", status: "Shipped" },
  { fullName: "John Smith", productName: "Jordan 1 Low", shippingAddress: "456 Oak St, Sometown, ST", amount: "$49.99", status: "Pending" },
  { fullName: "Alice Johnson", productName: "Lebron 19", shippingAddress:"Dumaguete, Negros Oriental", amount: "$29.99", status: "Delivered" },
  { fullName: "Jane Doe", productName: "Air Max", shippingAddress: "123 Elm St, Anytown, AN", amount: "$199.99", status: "Shipped" },
  { fullName: "John Smith", productName: "Jordan 1 Low", shippingAddress: "456 Oak St, Sometown, ST", amount: "$49.99", status: "Pending" },

];

const Orders = () => {
  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "60px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple orders table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Fullname</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.fullName}
                </TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
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

export default Orders;
