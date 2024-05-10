"use client"

import React, { useState } from 'react';
import Layout from "../../layouts/layout";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TablePagination
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Customer {
  email: string;
  username: string;
  fullName: string;
  role: string;
  mobileNumber: string;
  status: string;
}

const customerData: Customer[] = [
  { email: "jane.doe@example.com", username: "Raineheart", fullName: "Jane Doe", role: "User", mobileNumber: "123-456-7890", status: "Active" },
  { email: "john.doe@example.com", username: "Kurt", fullName: "John Doe", role: "Admin", mobileNumber: "098-765-4321", status: "Inactive" },
  { email: "john.doe@example.com", username: "Diana", fullName: "John Doe", role: "Admin", mobileNumber: "098-765-4321", status: "Inactive" },
  { email: "john.doe@example.com", username: "Hrishikesh", fullName: "John Doe", role: "Admin", mobileNumber: "098-765-4321", status: "Inactive" },
];

const Customers = () => {
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
        <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold" }}>Customers</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{customer.email}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>{customer.mobileNumber}</TableCell>
                <TableCell>{customer.status}</TableCell>
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
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={customerData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Layout>
  );
};

export default Customers;