import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, Link, Typography } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import { likeRecipe, recipesSelectors, removeRecipe, unlikeRecipe } from '../../../store/recipes';
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

  return (
    <Box sx={{
      height: 1,
      flexGrow: 1,
      overflow: 'auto',
    }}
    >
      {recipe ? (
        <>
          <Box
            elevation={0}
            sx={{
              height: 350,
              bgcolor: '#ccc',
            }}
          />
          <Container sx={{ width: 0.75 }}>
            <Typography component="h1" variant="h4">{recipe.name}</Typography>
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
