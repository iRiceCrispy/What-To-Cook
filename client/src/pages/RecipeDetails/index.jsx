import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import Pantry from '../../components/ui/Pantry';
import Navigation from '../../components/ui/Navigation';
import RecipeDetails from '../../components/ui/RecipeDetails';

const RecipeDetailsPage = () => (
  <Box
    id="recipeDetails"
    sx={{
      height: 1,
      display: 'flex',
    }}
  >
    <Navigation />
    <Container disableGutters>
      <Toolbar />
      <RecipeDetails />
    </Container>
    <Pantry />
  </Box>
);

export default RecipeDetailsPage;
