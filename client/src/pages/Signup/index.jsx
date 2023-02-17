import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import SignupForm from '../../components/forms/SignupForm';

const Signup = () => (
  <Box
    id="signup"
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
      <SignupForm />
    </Container>
  </Box>
);

export default Signup;
