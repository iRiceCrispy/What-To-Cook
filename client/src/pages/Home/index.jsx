import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { recipesSelectors } from '../../store/recipes';
import Recipes from '../../components/ui/Recipes';
import MainLayout from '../../layouts/MainLayout';

const Home = () => {
  const recipes = useSelector(recipesSelectors.selectAll);
  const [input, setInput] = useState();

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
        <TextField
          fullWidth
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search for recipes"
          inputProps={{
            sx: { pl: 1.75 },
          }}
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{
            mt: 3,
            mb: 6,
          }}
        />
        <Recipes recipes={input
          ? recipes.filter(r => r.name.includes(input) || r.description.includes(input))
          : recipes}
        />
      </Container>
    </MainLayout>
  );
};

export default Home;
