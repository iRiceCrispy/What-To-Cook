import React from 'react';
import { Container } from '@mui/material';
import RecipeForm from '../../components/forms/RecipeForm';
import ProtectedRoute from '../../layouts/ProtectedRoute';
import SecondaryLayout from '../../layouts/SecondaryLayout';

const RecipeFormPage = ({ edit }) => (
  <ProtectedRoute>
    <SecondaryLayout>
      <Container
        disableGutters
        sx={{
          width: 600,
          p: 8,
          boxSizing: 'content-box',
        }}
      >
        <RecipeForm edit={edit} />
      </Container>
    </SecondaryLayout>
  </ProtectedRoute>
);

export default RecipeFormPage;
