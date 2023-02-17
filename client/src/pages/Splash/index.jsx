import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';
import Navigation from '../../components/ui/Navigation';

const Splash = () => (
  <Box id="splash">
    <Navigation />
    <Toolbar />
    <Typography>Welcome</Typography>
  </Box>
);

export default Splash;
