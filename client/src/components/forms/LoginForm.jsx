import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert, Button, Box, Link, TextField, Typography } from '@mui/material';
import { demo, login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});

    dispatch(login({ credential, password }))
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

  const handleDemo = () => {
    setErrors({});

    dispatch(demo())
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
      onSubmit={handleLogin}
    >
      <Box component="header">
        <Typography component="h2" variant="h5" align="center">Welcome back</Typography>
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
        {errors.login && (
          <Alert severity="error">{errors.login}</Alert>
        )}
        <TextField
          error={Boolean(errors.credential)}
          id="credential"
          label="Username / Email"
          value={credential}
          helperText={errors.credential}
          onChange={e => setCredential(e.target.value)}
        />
        <TextField
          error={Boolean(errors.password)}
          id="password"
          label="Password"
          type="password"
          helperText={errors.password}
          onChange={e => setPassword(e.target.value)}
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
        }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ width: 1 }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={handleDemo}
            sx={{ width: 1 }}
          >
            Log In as Demo
          </Button>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <Typography>Not registered?</Typography>
          <Typography>&nbsp;</Typography>
          <Typography component={Link} to="/signup">Ceate an account.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
