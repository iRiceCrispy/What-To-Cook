import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Navigation from '../components/ui/Navigation';

const SecondaryLayout = ({ children }) => (
  <Box sx={{
    height: 1,
    width: 1,
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
  </Box>
);

export default SecondaryLayout;
