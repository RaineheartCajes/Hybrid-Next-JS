"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import Layout from "../../layouts/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import Image from "next/image";

interface InventoryItem {
  _id: string;
  productName: string;
  category: string;
  quantity: number;
  size: string;
  color: string;
  media?: string;
}

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editOpen, setEditOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchInventory = async (searchTerm = "") => {
    try {
      const response = await axios.get(
        `http://localhost:2000/table/getProducts?search=${searchTerm}`
      );
      const inventoryItems = response.data.map((item: any) => ({
        _id: item._id,
        productName: item.productName,
        category: item.category,
        quantity: item.quantity,
        size: item.sizes.join(", "),
        color: item.colors.join(", "),
        media: item.media,
      }));
      setInventory(inventoryItems);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchInventory(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleOpenEditModal = (item: InventoryItem) => {
    setCurrentItem({
      ...item,
      size: item.size.split(", ")[0],
      color: item.color.split(", ")[0],
    });
    setEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditOpen(false);
  };

  const handleSaveChanges = async () => {
    if (currentItem) {
      try {
        const response = await axios.put(
          "http://localhost:2000/table/editInventory",
          {
            productId: currentItem._id,
            productName: currentItem.productName,
            category: currentItem.category,
            sizes: [currentItem.size],
            colors: [currentItem.color],
            quantity: currentItem.quantity,
          }
        );

        const updatedItem = response.data;
        const updatedInventory = inventory.map((item) =>
          item._id === updatedItem._id
            ? {
                ...item,
                productName: updatedItem.productName,
                category: updatedItem.category,
                size: updatedItem.sizes.join(", "),
                color: updatedItem.colors.join(", "),
                quantity: updatedItem.quantity,
              }
            : item
        );
        setInventory(updatedInventory);
        handleCloseEditModal();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:2000/table/deleteProduct`, {
        data: { productId },
      });
      const updatedInventory = inventory.filter(
        (item) => item._id !== productId
      );
      setInventory(updatedInventory);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        [event.target.name]: event.target.value,
      });
    }
  };

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
          Inventory
        </h1>
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple inventory table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>
                    {item.media && (
                      <div
                        style={{ position: "relative", width: 50, height: 50 }}
                      >
                        <Image
                          src={`http://localhost:2000/${item.media}`}
                          alt={item.productName}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenEditModal(item)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
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
          count={inventory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={editOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Inventory Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={currentItem?.productName || ""}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={currentItem?.category || ""}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            select
            fullWidth
            label="Size"
            name="size"
            value={currentItem?.size || ""}
            onChange={handleChange}
            margin="dense"
          >
            {["S", "M", "L"].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Color"
            name="color"
            value={currentItem?.color || ""}
            onChange={handleChange}
            margin="dense"
          >
            {["White", "Red", "Black"].map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={currentItem?.quantity || 0}
            onChange={handleChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Inventory;
