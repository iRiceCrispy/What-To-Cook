import React from 'react';
import { Box } from '@mui/material';
import Pantry from '../../components/ui/Pantry';
import Navigation from '../../components/ui/Navigation';
import Recipes from '../../components/ui/Recipes';

const Dashboard = () => (
  <Box
    id="dashboard"
    sx={{
      height: 1,
      display: 'flex',
    }}
  >
    <Navigation />
    <Recipes />
    <Pantry />
  </Box>
);

export default Dashboard;
