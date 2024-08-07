"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layouts/layout";
import { useDebounce } from "use-debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface Customer {
  email: string;
  username: string;
  fullName: string;
  role: string;
  mobileNumber: string;
  status: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get<Customer[]>(
          "http://localhost:2000/table/customer",
          {
            params: { search: debouncedSearchTerm },
          }
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, [debouncedSearchTerm]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "80px" }}>
        <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold" }}>
          Customers
        </h1>
        <TextField
          label="Search Customers"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {customer.email}
                  </TableCell>
                  <TableCell>{customer.username}</TableCell>
                  <TableCell>{customer.fullName}</TableCell>
                  <TableCell>{customer.role}</TableCell>
                  <TableCell>{customer.mobileNumber}</TableCell>
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
          count={customers.length}
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
