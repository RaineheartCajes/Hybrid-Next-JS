import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer">
      <Container
        maxWidth="lg"
        // style={{
        //   justifyContent: "center",
        //   alignItems: "center",
        //   alignContent: "center",
        //   paddingTop: 20,
        // }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ textAlign: "center",  marginTop: 50 }}
          >
            <Typography variant="h6" component="div">
              Nova Techset Ltd.
            </Typography>
            <Typography>Your trusted source for great products.</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ textAlign: "center", marginTop: 50 }}
          >
            <Typography variant="h6" component="div">
              Resources
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <li>
                <Link href="#" color="inherit" underline="hover">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="hover">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="hover">
                  Other Resources
                </Link>
              </li>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ textAlign: "center", marginTop: 50 }}
          >
            <Typography variant="h6" component="div">
              Contact
            </Typography>
            <Typography>Email: rcajes@novatechset.com</Typography>
            <Typography>Phone: 09123456789</Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          sx={{ mt: 4 }}
          style={{ textAlign: "center" }}
        >
          © {new Date().getFullYear()} Nova Techset - All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
