import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, IconButton, ImageList, ImageListItem, List, ListItem, ListItemText, Link, Typography } from '@mui/material';
import { ThumbUp, Visibility } from '@mui/icons-material';
import { increaseRecipeViewCount, likeRecipe, recipesSelectors, removeRecipe, unlikeRecipe } from '../../../store/recipes';
import { getSessionUser, getLikedRecipes } from '../../../store/session';
import { pantrySelectors } from '../../../store/pantry';

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionUser = useSelector(getSessionUser);
  const pantry = useSelector(pantrySelectors.selectAll);
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));
  const isLikedByUser = useSelector(getLikedRecipes).includes(Number(id));
  const isOwner = recipe?.user.id === sessionUser?.id;

  const handleDelete = () => {
    dispatch(removeRecipe(id));
    navigate('/dashboard');
  };

  const handleLike = () => {
    if (!isLikedByUser) {
      dispatch(likeRecipe({ id, userId: sessionUser.id }));
    }
    else {
      dispatch(unlikeRecipe({ id, userId: sessionUser.id }));
    }
  };

  useEffect(() => {
    const time = 5000;
    const timer = setTimeout(() => {
      dispatch(increaseRecipeViewCount(id));
    }, time);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  return (
    <Box sx={{
      height: 1,
      flexGrow: 1,
      overflow: 'auto',
    }}
    >
      {recipe ? (
        <>
          {recipe.images.length ? (
            <ImageList
              cols={recipe.images.length > 3 ? 3 : recipe.images.length}
              rowHeight={350}
              sx={{
                height: 350,
                maxHeight: 400,
                mt: 0,
              }}
            >
              {recipe.images?.map(image => (
                <ImageListItem
                  key={image.id}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    style={{
                      height: 350,
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Box
              sx={{
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: '#ccc',
              }}
            >
              <Typography
                component="p"
                variant="h2"
                align="center"
              >
                No Images
              </Typography>
            </Box>
          )}
          <Container sx={{
            mt: 6,
            width: 0.75,
          }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                overflowWrap: 'break-word',
              }}
            >
              {recipe.name}
            </Typography>
            <Typography component="h2" variant="h6">{recipe.description || 'No description'}</Typography>
            {isOwner && (
            <Box>
              <Button variant="contained" component={Link} to="./edit">Edit</Button>
              <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </Box>
            )}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
            >
              <Typography>{recipe.likes}</Typography>
              <IconButton
                disabled={!sessionUser}
                color={isLikedByUser ? 'success' : 'default'}
                onClick={handleLike}
              >
                <ThumbUp />
              </IconButton>
              <Box sx={{
                display: 'flex',
                justfiyContent: 'center',
                gap: 0.5,
              }}
              >
                <Typography>{recipe.views}</Typography>
                <Visibility />
              </Box>
            </Box>
            <Typography variant="body2">
              You have
              {' '}
              {recipe.ingredients.filter(i => pantry.some(pi => pi.id === i.id)).length}
              /
              {recipe.ingredients.length}
              {' '}
              required ingredients.
            </Typography>
            <List>
              {recipe.ingredients.map(ingredient => (
                <ListItem
                  key={ingredient.id}
                  sx={{ py: 0 }}
                >
                  <ListItemText primary={ingredient.name} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">Instructions:</Typography>
            <List component="ol">
              {recipe.instructions.map(instruction => (
                <ListItem key={instruction.id}>
                  <ListItemText primary={`Step ${instruction.order}. `} secondary={instruction.body} />
                </ListItem>
              ))}
            </List>

          </Container>
        </>
      ) : (
        <Typography variant="h5">No Recipe Found</Typography>
      )}
    </Box>
  );
};

export default RecipeDetails;
