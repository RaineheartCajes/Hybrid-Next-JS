// components/Orders.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../layouts/layout";
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
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { fetchOrders, updateOrderStatus } from "../../services/slice/orderReducer";
import { RootState, useAppDispatch } from "../../services/store";
import { useDebounce } from "use-debounce";

interface Product {
  productName: string;
}

interface Order {
  _id: string;
  customer: {
    fullName: string;
  };
  products: {
    product: Product;
    color: string;
    size: string;
    quantity: number;
  }[];
  shippingAddress: string;
  totalAmount: number;
  orderPlaced: boolean;
  status: string;
}

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce

  useEffect(() => {
    dispatch(fetchOrders(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  return (
    <Layout>
      <TableContainer component={Paper} style={{ marginTop: "80px" }}>
        <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold" }}>
          Orders
        </h1>
        <TextField
          label="Search Orders"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
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
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {order.customer.fullName}
                  </TableCell>
                  <TableCell>
                    {order.products.map((product, index) => (
                      <div key={index}>{product.product.productName}</div>
                    ))}
                  </TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Layout>
  );
};

export default Orders;
