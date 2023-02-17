import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import RecipeForm from '../../components/forms/RecipeForm';
import Navigation from '../../components/ui/Navigation';

const RecipeFormPage = ({ edit }) => (
  <Box
    id="recipeForm"
    sx={{
      height: 1,
      display: 'flex',
    }}
  >
    <Navigation />
    <Container sx={{ width: 750 }}>
      <Toolbar />
      <RecipeForm edit={edit} />
    </Container>
  </Box>
);

export default RecipeFormPage;
