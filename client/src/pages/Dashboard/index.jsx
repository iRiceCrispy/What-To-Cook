import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { getRecipesByUser } from '../../store/recipes';
import { getSessionUser } from '../../store/session';
import Recipes from '../../components/ui/Recipes';
import ProtectedRoute from '../../layouts/ProtectedRoute';
import MainLayout from '../../layouts/MainLayout';

const Dashboard = () => {
  const sessionUser = useSelector(getSessionUser);
  const recipes = useSelector(state => getRecipesByUser(state, sessionUser));

  return (
    <ProtectedRoute>
      <MainLayout>
        <Container
          disableGutters
          sx={{
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography component="h1" variant="h4">My Recipes</Typography>
          <Recipes hideUser recipes={recipes} />
        </Container>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
