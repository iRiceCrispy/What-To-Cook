import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Box, TextField, Typography } from '@mui/material';
import { signup } from '../../store/session';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSignup = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(signup({ email, username, password, confirmPassword }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.csrfToken) {
          alert('Something went wrong when submitting the form. Please try again.');
        }
        else {
          setErrors(err);
        }
      });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSignup}
    >
      <Box component="header">
        <Typography component="h2" variant="h5" align="center">Create an account</Typography>
      </Box>
      <Box
        component="main"
        sx={{
          mt: 8,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          gap: 2,
        }}
      >
        <TextField
          error={Boolean(errors.username)}
          id="username"
          label="Username"
          value={username}
          helperText={errors.username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          error={Boolean(errors.email)}
          id="email"
          label="Email"
          value={email}
          helperText={errors.email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          error={Boolean(errors.password)}
          id="password"
          label="Password"
          value={password}
          type="password"
          helperText={errors.password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          error={Boolean(errors.confirmPassword)}
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          type="password"
          helperText={errors.confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </Box>
      <Box
        component="footer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: 1 }}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <Typography>Already registered?</Typography>
          <Typography>&nbsp;</Typography>
          <Typography component={Link} to="/login">Log in here.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupForm;
