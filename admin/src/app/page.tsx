"use client"

import * as React from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Footer from "../layouts/footer";

const BackgroundImageBox = styled(Box)({
  backgroundImage: 'url("/home-bg2.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
});

export default function Home() {
  return (
    <main>
      <BackgroundImageBox>
        <Container maxWidth="sm" >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", marginTop: 8 }}
          >
            Welcome to Admin Page
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Button
              variant="contained"
              href="/login"
              style={{
                marginRight: 2,
                alignItems: "center",
                justifyContent: "center",
                margin: "50px",
                padding: "20px",
                width: "200px",
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              href="/register"
              color="secondary"
              style={{
                marginRight: 2,
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                width: "200px",
              }}
            >
              Register
            </Button>
          </div>
        </Container>
        <Footer />
      </BackgroundImageBox>
    </main>
  );
}
