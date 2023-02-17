import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Toolbar, Typography } from '@mui/material';
import { recipesSelectors } from '../../../store/recipes';
import { pantrySelectors } from '../../../store/pantry';

const Recipes = () => {
  const pantry = useSelector(pantrySelectors.selectAll);
  const recipes = useSelector(recipesSelectors.selectAll);

  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Typography
        component="h1"
        variant="h4"
        sx={{ mt: 4 }}
      >
        Recipes:
      </Typography>
      <Grid
        container
        sx={{
          maxWidth: 900,
          mt: 6,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 250px)',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {recipes.map(recipe => (
          <Grid item key={recipe.id}>
            <Card sx={{
              height: 300,
              width: 250,
            }}
            >
              <CardActionArea
                component={Link}
                to={`/recipes/${recipe.id}`}
                sx={{ height: 1 }}
              >
                <CardMedia
                  component="div"
                  title={recipe.name}
                  sx={{
                    height: 0.5,
                    bgcolor: '#ccc',
                  }}
                />
                <CardContent sx={{
                  height: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                >
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography variant="body2">{recipe.description}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 'auto' }}
                  >
                    By:
                    {' '}
                    {recipe.user.username}
                  </Typography>
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                  >
                    <Typography variant="body2">
                      {' '}
                      {recipe.ingredients.filter(i => pantry.some(pi => pi.id === i.id)).length}
                      /
                      {recipe.ingredients.length}
                      {' '}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recipes;
