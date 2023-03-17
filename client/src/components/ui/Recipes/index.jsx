import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Tooltip, Typography } from '@mui/material';
import { ThumbUp, Visibility } from '@mui/icons-material';
import { pantrySelectors } from '../../../store/pantry';

const DefaultImage = () => (
  <Box
    sx={{
      height: 150,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      bgcolor: '#ccc',
    }}
  >
    <Typography
      component="p"
      variant="h5"
      align="center"
    >
      No Image
    </Typography>
  </Box>
);

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
          <Tooltip
            followCursor
            enterDelay={500}
            enterNextDelay={500}
            placement="bottom-start"
            title={(
              <Box sx={{
                maxWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
              >
                <Typography variant="body2">{recipe.name}</Typography>
                <Typography variant="caption" lineHeight={1.2}>{recipe.description}</Typography>
              </Box>
            )}
          >
            <Card
              raised
              sx={{
                width: 250,
              }}
            >
              <CardActionArea
                component={Link}
                to={`/recipes/${recipe.id}`}
                sx={{ height: 1 }}
              >
                <CardMedia
                  component={recipe.images.length ? 'img' : DefaultImage}
                  image={recipe.images[0]?.url}
                  sx={{
                    height: 150,
                    bgcolor: '#ccc',
                  }}
                />
                <CardContent sx={{
                  height: 155,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                >
                  <Typography variant="h6" noWrap>{recipe.name}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                    }}
                  >
                    {recipe.description}
                  </Typography>
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
                      noWrap
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
                    px: 0.75,
                    bgcolor: '#ccc9',
                    borderRadius: 1,
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
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default Recipes;
