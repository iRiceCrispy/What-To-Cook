import React from 'react';
import { Container } from '@mui/material';
import Recipes from '../../components/ui/Recipes';
import MainLayout from '../../layouts/MainLayout';

const Dashboard = () => (
  <MainLayout>
    <Container
      disableGutters
      sx={{ p: 8 }}
    >
      <Recipes />
    </Container>
  </MainLayout>
);

export default Dashboard;
