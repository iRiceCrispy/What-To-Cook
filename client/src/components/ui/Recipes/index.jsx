import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ThumbUp, Visibility } from '@mui/icons-material';
import { pantrySelectors } from '../../../store/pantry';

const Recipes = ({ recipes, hideUser }) => {
  const pantry = useSelector(pantrySelectors.selectAll);

  return (
    <Grid
      container
      sx={{
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
                <Box sx={{
                  mt: 'auto',
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  gap: 1,
                }}
                >
                  {!hideUser && (
                    <Typography
                      variant="body2"
                      sx={{ mr: 'auto' }}
                    >
                      By:
                      {' '}
                      {recipe.user.username}
                    </Typography>
                  )}
                  <Box sx={{
                    display: 'flex',
                    gap: '2px',
                  }}
                  >
                    <Typography>{recipe.likes}</Typography>
                    <ThumbUp fontSize="small" />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    gap: '2px',
                  }}
                  >
                    <Typography>{recipe.views}</Typography>
                    <Visibility fontSize="small" />
                  </Box>
                </Box>
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
  );
};

export default Recipes;
