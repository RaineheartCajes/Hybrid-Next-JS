"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layouts/layout";
import Image from "next/image";
import { postProduct, fetchProducts } from "../../services/slice/productReducer";
import { RootState, AppDispatch } from "../../services/store";
import { useDebounce } from "use-debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface Product {
  productName: string;
  category: string;
  sizes: string[];
  colors: string[];
  price: number;
  description: string;
  quantity: number;
  media?: string;
}

interface ProductFormState extends Omit<Product, "media"> {
  file?: File;
}

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductFormState>({
    productName: "",
    category: "",
    sizes: [],
    colors: [],
    price: 0,
    description: "",
    quantity: 0,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce

  useEffect(() => {
    dispatch(fetchProducts(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewProduct({ ...newProduct, file: event.target.files[0] });
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("productName", newProduct.productName);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("sizes", JSON.stringify(newProduct.sizes));
    formData.append("colors", JSON.stringify(newProduct.colors));
    formData.append("price", newProduct.price.toString());
    formData.append("quantity", newProduct.quantity.toString());
    if (newProduct.file) {
      formData.append("media", newProduct.file);
    }

    dispatch(postProduct(formData));
    setOpen(false);
    setNewProduct({
      productName: "",
      category: "",
      sizes: [],
      colors: [],
      price: 0,
      description: "",
      quantity: 0,
      file: undefined,
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "sizes" || name === "colors") {
      setNewProduct({ ...newProduct, [name]: [value] }); // Ensures sizes and colors are managed as arrays
    } else {
      setNewProduct({ ...newProduct, [name]: value });
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
      <TableContainer component={Paper} style={{ marginTop: "55px" }}>
        <h1 style={{ color: "black", fontSize: "30px", fontWeight: "bold" }}>
          Products
        </h1>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpen}
          style={{ marginBottom: 20, marginLeft: "auto", marginRight: "10px" }}
        >
          Add Product
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>
                    {product.media && (
                      <div
                        style={{
                          position: "relative",
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <Image
                          src={`http://localhost:2000/uploads/${product.media
                            .split("/")
                            .pop()}`}
                          alt="Product"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sizes.join(", ")}</TableCell>
                  <TableCell>{product.colors.join(", ")}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            margin="dense"
            onChange={handleChange}
            value={newProduct.category}
          >
            {["Sneakers", "Sports", "Fashion"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="Size"
            name="sizes"
            margin="dense"
            onChange={handleChange}
            value={newProduct.sizes[0] || ""}
          >
            {["S", "M", "L"].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="Color"
            name="colors"
            margin="dense"
            onChange={handleChange}
            value={newProduct.colors[0] || ""}
          >
            {["Red", "Black", "White"].map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="dense"
            multiline
            rows={4}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            margin="dense"
            onChange={handleChange}
            value={newProduct.quantity}
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: 10 }}
          >
            Upload Image
            <input type="file" onChange={handleFileChange} hidden />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Products;
