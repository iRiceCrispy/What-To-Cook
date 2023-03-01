/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Button, Box, Chip, List, ListItem, IconButton, ImageList, ImageListItem, ImageListItemBar, TextField, Typography } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { Delete, Verified } from '@mui/icons-material';
import { recipesSelectors, addRecipe, updateRecipe } from '../../store/recipes';
import { getIngredients, ingredientsSelectors } from '../../store/ingredients';

const filter = createFilterOptions();

const Ingredient = styled(Chip)(() => ({
  '& .MuiChip-icon': {
    order: 1,
    marginLeft: -10,
    marginRight: 12,
  },
  '& .MuiChip-deleteIcon': {
    order: 2,
  },
}));

const RecipeForm = ({ edit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const allIngredients = useSelector(ingredientsSelectors.selectAll);
  const recipe = useSelector(state => recipesSelectors.selectById(state, id));
  const [ingredientList, setIngredientList] = useState([...allIngredients]);
  const [name, setName] = useState(edit ? recipe.name : '');
  const [description, setDescription] = useState(edit ? recipe.description : '');
  const [images, setImages] = useState(edit ? recipe.images.map(i => ({ ...i })) : []);
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
      images: images.map((image, index) => ({
        id: image.id,
        order: index + 1,
        description: image.newDescription || image.description,
        dataUrl: image.dataUrl,
      })),
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
          dispatch(getIngredients());
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
          dispatch(getIngredients());
          navigate(`/recipes/${r.id}`);
        })
        .catch((err) => {
          setErrors(err);
        });
    }
  };

  const uploadImages = (e) => {
    setImages(prev => [
      ...prev,
      ...Array.from(e.target.files).map((file) => {
        const image = {
          description: file.name,
          url: URL.createObjectURL(file),
        };

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          image.dataUrl = reader.result;
        };

        return image;
      }),
    ]);

    e.target.value = null;
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
        <Box>
          <ImageList cols={3}>
            {images.map((image, index) => (
              <ImageListItem
                key={index}
                sx={{ position: 'relative' }}
              >
                <img
                  src={image.url}
                  alt={image.description}
                  style={{
                    height: 150,
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                  sx={{
                    color: '#000',
                    bgcolor: '#fff',
                    '&:hover': {
                      bgcolor: '#fff',
                    },
                    opacity: 0.5,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Delete />
                </IconButton>
                <ImageListItemBar
                  position="below"
                  title={(
                    <TextField
                      variant="standard"
                      size="small"
                      value={image.newDescription}
                      onChange={e => setImages((prev) => {
                        prev[index].newDescription = e.target.value;
                        return [...prev];
                      })}
                      placeholder={image.description}
                    />
                  )}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Button variant="contained" component="label">
            Upload Images
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={uploadImages}
            />
          </Button>
        </Box>
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
          autoHighlight
          freeSolo
          id="ingredients"
          options={ingredientList.sort((a, b) => a.name.localeCompare(b.name))}
          getOptionLabel={option => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some(option => inputValue === option.name);

            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                name: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          value={ingredients}
          onChange={(_event, _value, reason, { option } = {}) => {
            if (reason === 'selectOption') {
              if (option.inputValue) {
                const newOption = {
                  name: option.inputValue,
                  verified: false,
                };

                setIngredientList(prev => [...prev, newOption]);
                setIngredients(prev => [...prev, newOption]);
              }
              else {
                setIngredients(prev => [...prev, option]);
              }
            }
            else if (reason === 'removeOption') {
              if (!option.id) {
                setIngredientList(prev => prev.filter(i => i.name !== option.name));
              }

              setIngredients(prev => prev.filter(i => i.name !== option.name));
            }
            else if (reason === 'clear') {
              setIngredients([]);
            }
          }}
          inputValue={ingredientInput}
          onInputChange={(_event, value) => setIngredientInput(value)}
          renderInput={params => (
            <TextField
              {...params}
              error={Boolean(errors.ingredients)}
              label="Ingredients"
              helperText={errors.ingredients ? 'Must have at least one ingredient.' : ''}
            />
          )}
          renderOption={(props, option) => (
            <Box
              {...props}
              component="li"
              sx={{ gap: 0.5 }}
            >
              {option.name}
              {option.verified ? <Verified fontSize="small" color="primary" /> : null}
            </Box>
          )}
          renderTags={(value, getTagProps) => value.map((option, index) => (
            <Ingredient
              {...getTagProps({ index })}
              key={index}
              color="primary"
              icon={option.verified ? <Verified fontSize="small" /> : null}
              label={option.name}
            />
          ))}
        />
        <Box>
          <List>
            {instructions.map((instruction, index) => (
              <ListItem
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
