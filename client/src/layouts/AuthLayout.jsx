import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Toolbar, Typography } from '@mui/material';

const AuthLayout = ({ children }) => (
  <Box sx={{
    height: 1,
    width: 1,
  }}
  >
    <Toolbar sx={{ p: 3 }}>
      <Typography
        variant="h5"
        component={Link}
        to="/"
        sx={{ textDecoration: 'none' }}
      >
        What To Cook
      </Typography>
    </Toolbar>
    <Container
      disableGutters
      sx={{
        width: 400,
        p: 8,
        boxSizing: 'content-box',
      }}
    >
      {children}
    </Container>
  </Box>
);

export default AuthLayout;
