import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from '../../components/forms/LoginForm';

const Login = () => (
  <Box
    id="login"
    sx={{ mt: 21 }}
  >
    <Box sx={{
      position: 'absolute',
      top: 24,
      left: 24,
    }}
    >
      <Typography variant="h5" component={Link} to="/">What To Cook</Typography>
    </Box>
    <Container sx={{ width: 450 }}>
      <LoginForm />
    </Container>
  </Box>
);

export default Login;
