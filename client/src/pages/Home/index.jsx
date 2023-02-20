import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { recipesSelectors } from '../../store/recipes';
import Recipes from '../../components/ui/Recipes';
import MainLayout from '../../layouts/MainLayout';

const Home = () => {
  const recipes = useSelector(recipesSelectors.selectAll);

  return (
    <MainLayout>
      <Container
        disableGutters
        sx={{
          p: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">Recipes</Typography>
        <Recipes recipes={recipes} />
      </Container>
    </MainLayout>
  );
};

export default Home;
