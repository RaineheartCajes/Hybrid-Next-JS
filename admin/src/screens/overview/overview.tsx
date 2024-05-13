"use client"

import React from 'react';
import Layout from "../../layouts/layout";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Sample data for charts using Chart.js format
const ordersData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Sales',
      data: [2400, 1398, 9800],
      fill: false,
      backgroundColor: '#8884d8',
      borderColor: '#8884d8',
    }
  ]
};

// Options for the line chart
const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  maintainAspectRatio: false
};

const Overview = () => {
  return (
    <Layout>
      <Typography variant="h4" sx={{ mt: 6 }}>Overview</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Over Time
              </Typography>
              <div style={{ height: '300px' }}>
                <Line data={ordersData} options={options} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Overview;
