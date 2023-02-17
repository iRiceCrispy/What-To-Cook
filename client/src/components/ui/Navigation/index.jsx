import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, Typography, Box, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
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

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
        >
          What to cook
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'start',
          flexGrow: 1,
          mx: 6,
        }}
        >
          <Button
            component={Link}
            to="/recipes/create"
            color="secondary"
          >
            Create Recipe
          </Button>
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 4,
        }}
        >
          {sessionUser ? (
            <>
              <Button
                component={Link}
                to="/dashboard"
                color="secondary"
              >
                Dashboard
              </Button>
              <IconButton size="large" onClick={openMenu}>
                <AccountCircle fontSize="large" />
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
              <Button
                component={Link}
                to="/login"
                color="secondary"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                color="secondary"
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
