import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Navigation from '../components/ui/Navigation';
import Pantry from '../components/ui/Pantry';

const MainLayout = ({ children }) => (
  <Box sx={{
    height: 1,
    width: 1,
    display: 'flex',
  }}
  >
    <Navigation />
    <Box sx={{
      height: 1,
      width: 1,
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <Toolbar />
      <Box sx={{
        height: 1,
        overflow: 'auto',
      }}
      >
        {children}
      </Box>
    </Box>
    <Pantry />
  </Box>
);

export default MainLayout;
