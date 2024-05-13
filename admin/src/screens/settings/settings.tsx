import React from 'react';
import Layout from "../../layouts/layout";
import {
  Card, CardContent, Typography, Grid, TextField,
  Button, Avatar, Box
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Sample user data
const userData = {
  username: "johndoe123",
  fullName: "John Doe",
  email: "john.doe@example.com",
  role: "Administrator",
  mobileNumber: "123-456-7890"
};

const Settings = () => {
  return (
    <Layout>
      <Grid container spacing={2} justifyContent="center" marginTop={5}  >
        <Grid item xs={12} md={12}>
          <Card raised>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Avatar sx={{ bgcolor: "secondary.main", marginRight: 2 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="h5" component="div">
                  User Profile Settings
                </Typography>
              </Box>
              <TextField
                label="Username"
                defaultValue={userData.username}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Full Name"
                defaultValue={userData.fullName}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                defaultValue={userData.email}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Role"
                defaultValue={userData.role}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mobile Number"
                defaultValue={userData.mobileNumber}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Box marginTop={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Settings;
