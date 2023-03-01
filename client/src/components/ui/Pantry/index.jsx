import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Box, Button, Chip, Drawer, TextField, Toolbar, Typography } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { Verified } from '@mui/icons-material';
import { getIngredients, ingredientsSelectors } from '../../../store/ingredients';
import { getSessionUser } from '../../../store/session';
import { updatePantry, pantrySelectors } from '../../../store/pantry';

const filter = createFilterOptions();

const Ingredient = styled(Chip)(() => ({
  '& .MuiChip-icon': {
    order: 1,
    marginLeft: -6,
    marginRight: 5,
  },
}));

const Pantry = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getSessionUser);
  const allIngredients = useSelector(ingredientsSelectors.selectAll);
  const pantry = useSelector(pantrySelectors.selectAll);
  const [ingredientList, setIngredientList] = useState([...allIngredients]);
  const [newPantry, setNewPantry] = useState(pantry);
  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [input, setInput] = useState('');

  const edited = Boolean(addList.length || removeList.length);

  const confirm = () => {
    if (!edited) return;

    dispatch(updatePantry({ userId: sessionUser.id, ingredients: newPantry }))
      .then(() => {
        setAddList([]);
        setRemoveList([]);
        dispatch(getIngredients());
      });
  };

  const cancel = () => {
    setAddList([]);
    setRemoveList([]);
    setNewPantry(pantry);
  };

  const addIngredient = (ingredient) => {
    if (!ingredient.id) {
      setIngredientList(prev => [...prev, ingredient]);
    }

    if (pantry.some(p => p.name === ingredient.name)) {
      setNewPantry(prev => [...prev, ingredient]);
      setRemoveList(prev => prev.filter(i => i.name !== ingredient.name));
    }
    else {
      setNewPantry(prev => [...prev, ingredient]);
      setAddList(prev => [...prev, ingredient]);
    }
  };

  const removeIngredient = (ingredient) => {
    if (!ingredient.id) {
      setIngredientList(prev => prev.filter(i => i.name !== ingredient.name));
    }

    if (pantry.some(p => p.name === ingredient.name)) {
      setNewPantry(prev => prev.filter(i => i.name !== ingredient.name));
      setRemoveList(prev => [...prev, ingredient]);
    }
    else {
      setNewPantry(prev => prev.filter(i => i.name !== ingredient.name));
      setAddList(prev => prev.filter(i => i.name !== ingredient.name));
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 350,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    >
      <Toolbar />
      <Box sx={{
        height: 1,
        pb: 1.5,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
      >
        <Box sx={{
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
          zIndex: 'appBar',
        }}
        >
          <Typography
            fontWeight="bold"
            variant="h6"
            textAlign="center"
            sx={{
              p: 3,
              bgcolor: 'primary.main',
            }}
          >
            My Pantry
          </Typography>
          <Autocomplete
            multiple
            autoHighlight
            disableClearable
            freeSolo
            id="searchIngredients"
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
            value={newPantry}
            onChange={(_event, _value, reason, { option }) => {
              if (reason === 'selectOption') {
                if (option.inputValue) {
                  const newOption = {
                    name: option.inputValue,
                    verified: false,
                  };

                  addIngredient(newOption);
                }
                else {
                  addIngredient(option);
                }
              }
              else if (reason === 'removeOption') {
                removeIngredient(option);
              }
            }}
            inputValue={input}
            onInputChange={(_event, value) => setInput(value)}
            renderInput={params => (
              <TextField
                {...params}
                size="small"
                placeholder="Search for ingredients"
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
            renderTags={() => null}
            sx={{
              p: 3,
              bgcolor: '#fff',
            }}
          />
        </Box>
        <Box sx={{
          height: 1,
          minHeight: 350,
          mt: 21,
          py: 1.5,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
        >
          <Box
            component="ul"
            sx={{
              m: 0,
              p: 0,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 1.5,
            }}
          >
            {[...newPantry, ...removeList]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((ingredient) => {
                if (addList.some(a => a.name === ingredient.name)) {
                  return (
                    <Ingredient
                      key={ingredient.name}
                      component="li"
                      color="success"
                      icon={ingredient.verified ? <Verified fontSize="small" /> : null}
                      label={ingredient.name}
                      onClick={() => removeIngredient(ingredient)}
                    />
                  );
                }
                if (removeList.some(r => r.name === ingredient.name)) {
                  return (
                    <Ingredient
                      key={ingredient.name}
                      component="li"
                      color="error"
                      icon={ingredient.verified ? <Verified fontSize="small" /> : null}
                      label={ingredient.name}
                      onClick={() => addIngredient(ingredient)}
                    />
                  );
                }
                return (
                  <Ingredient
                    key={ingredient.name}
                    component="li"
                    color="primary"
                    icon={ingredient.verified ? <Verified fontSize="small" /> : null}
                    label={ingredient.name}
                    onClick={() => removeIngredient(ingredient)}
                  />
                );
              })}
          </Box>
        </Box>
        {edited && (
          <Box sx={{
            py: 1.5,
            px: 3,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
          >
            <Button
              variant="contained"
              onClick={confirm}
              sx={{ width: 1 }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              onClick={cancel}
              sx={{ width: 1 }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Pantry;
