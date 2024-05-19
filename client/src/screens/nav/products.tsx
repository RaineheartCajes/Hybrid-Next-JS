"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/layouts/layout";
import Image from "next/image";
import {
  ImageList,
  ImageListItem,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import { RootState, AppDispatch } from "../../redux/index";
import { fetchProducts } from "../../redux/reducer/productReducer";
import { addToCart } from "../../redux/reducer/cartReducer";

interface Product {
  _id: string;
  productName: string;
  description: string;
  media: string;
  category: string;
  sizes: string[];
  colors: string[];
  price: number;
}

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const user = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce
  const [color, setColor] = useState<{ [key: string]: string }>({});
  const [size, setSize] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchProducts(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  const handleAddToCart = (product: Product) => {
    if (!color[product._id] || !size[product._id]) {
      console.error("Color and size are required.");
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        productName: product.productName,
        price: product.price,
        quantity: 1,
        media: product.media,
        color: color[product._id],
        size: size[product._id],
        shippingAddress: user.shippingAddress,
      })
    );

    // Clear fields after adding to cart
    setColor((prev) => ({ ...prev, [product._id]: "" }));
    setSize((prev) => ({ ...prev, [product._id]: "" }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <ImageList cols={4} gap={20}>
          {products.map((product) => (
            <ImageListItem
              key={product._id}
              style={{
                border: "1px solid black",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <Image
                src={`http://localhost:2000/${product.media}`}
                alt={product.productName}
                layout="responsive"
                width={500}
                height={500}
                style={{ objectFit: "cover", maxHeight: "250px" }}
              />
              <Box
                sx={{
                  padding: 2,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    {product.productName}
                  </Typography>
                  <Typography variant="subtitle2">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Select
                    value={color[product._id] || ""}
                    onChange={(e) =>
                      setColor({
                        ...color,
                        [product._id]: e.target.value as string,
                      })
                    }
                    displayEmpty
                    fullWidth
                    sx={{ mt: 1, mb: 1 }}
                  >
                    <MenuItem value="" disabled>
                      Select Color
                    </MenuItem>
                    {product.colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={size[product._id] || ""}
                    onChange={(e) =>
                      setSize({
                        ...size,
                        [product._id]: e.target.value as string,
                      })
                    }
                    displayEmpty
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    <MenuItem value="" disabled>
                      Select Size
                    </MenuItem>
                    {product.sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  sx={{ mt: 1 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </Layout>
  );
};

export default ProductPage;
