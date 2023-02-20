import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, Link, Typography, Box, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { getSessionUser, logout } from '../../../store/session';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(getSessionUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout())
      .then(() => navigate('/'));
  };

  const NavButton = styled(Button)(() => ({
    color: 'inherit',
    fontWeight: 'bold',
    size: 'large',
  }));

  return (
    <AppBar
      color="secondary"
      position="fixed"
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/"
          sx={{
            fontWeight: 'bold',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          What To Cook
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          flexGrow: 1,
          mx: 6,
        }}
        >
          <NavButton
            component={Link}
            to="/recipes/create"
          >
            Create Recipe
          </NavButton>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
        >
          {sessionUser ? (
            <>
              <NavButton
                component={Link}
                to="/dashboard"
              >
                Dashboard
              </NavButton>
              <IconButton
                color="inherit"
                onClick={openMenu}
                sx={{
                  height: 'min-content',
                  width: 'min-content',
                  p: 0,
                }}
              >
                <AccountCircle sx={{ color: 'inherit' }} fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                <MenuItem>{sessionUser.username}</MenuItem>
                <MenuItem>{sessionUser.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <NavButton
                component={Link}
                to="/login"
              >
                Login
              </NavButton>
              <NavButton
                component={Link}
                to="/signup"
              >
                Sign up
              </NavButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
