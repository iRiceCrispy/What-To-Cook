import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Button, Box, List, ListItem, TextField, Typography } from '@mui/material';
import { recipesSelectors, addRecipe, updateRecipe } from '../../store/recipes';
import { ingredientsSelectors } from '../../store/ingredients';

const RecipeForm = ({ edit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredientList = useSelector(ingredientsSelectors.selectAll);
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));
  const [name, setName] = useState(edit ? recipe.name : '');
  const [description, setDescription] = useState(edit ? recipe.description : '');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState(edit ? recipe.ingredients : []);
  const [instructions, setInstructions] = useState(edit ? recipe.instructions.map(i => i.body) : ['']);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newRecipe = {
      name,
      description,
      ingredients,
      instructions: instructions.map((instruction, index) => (
        { order: index + 1, body: instruction }
      )),
    };

    if (edit) {
      newRecipe.id = recipe.id;
      dispatch(updateRecipe(newRecipe))
        .unwrap()
        .then((r) => {
          navigate(`/recipes/${r.id}`);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
    else {
      dispatch(addRecipe(newRecipe))
        .unwrap()
        .then((r) => {
          navigate(`/recipes/${r.id}`);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box component="header">
        <Typography component="h2" variant="h5" align="center">{edit ? `Edit for ${recipe.name}` : 'Create your recipe'}</Typography>
      </Box>
      <Box
        component="main"
        sx={{
          mt: 8,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          gap: 2,
        }}
      >
        <TextField
          error={Boolean(errors.name)}
          id="name"
          label="Name"
          value={name}
          helperText={errors.name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          multiline
          minRows={3}
          error={Boolean(errors.description)}
          id="description"
          label="Description"
          value={description}
          helperText={errors.description}
          onChange={e => setDescription(e.target.value)}
        />
        <Autocomplete
          multiple
          id="ingredients"
          options={ingredientList}
          value={ingredients}
          onChange={(e, newValue) => setIngredients(newValue)}
          inputValue={ingredientInput}
          onInputChange={(e, newInputValue) => setIngredientInput(newInputValue)}
          getOptionLabel={option => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderInput={params => (
            <TextField
              {...params}
              error={Boolean(errors.ingredients)}
              label="Ingredients"
              helperText={errors.ingredients ? 'Must have at least one ingredient.' : ''}
            />
          )}
        />
        <Box>
          <List>
            {instructions.map((instruction, index) => (
              <ListItem
              // eslint-disable-next-line react/no-array-index-key
                key={index}
                sx={{
                  p: 0,
                  flexDirection: 'column',
                  alignItems: 'end',
                }}
              >
                <TextField
                  multiline
                  variant="standard"
                  error={Boolean(errors.instructions?.[index]?.body)}
                  id={`instruction${index + 1}`}
                  label={`Step ${index + 1}`}
                  value={instruction}
                  onChange={e => setInstructions((prev) => {
                    prev[index] = e.target.value;
                    return [...prev];
                  })}
                  helperText={errors.instructions?.[index]?.body}
                  sx={{ width: 1 }}
                />
                {instructions.length > 1 && (
                  <Button
                    onClick={() => setInstructions(prev => prev.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
          <Button
            onClick={() => setInstructions(prev => [...prev, ''])}
          >
            Add another instruction
          </Button>
        </Box>
      </Box>
      <Box component="footer">
        <Button variant="contained" type="submit">{edit ? 'Confirm' : 'Create'}</Button>
      </Box>
    </Box>
  );
};

export default RecipeForm;
