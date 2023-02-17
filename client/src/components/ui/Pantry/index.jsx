import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Box, Button, Chip, Drawer, TextField, Toolbar, Typography } from '@mui/material';
import { Verified } from '@mui/icons-material';
import { ingredientsSelectors } from '../../../store/ingredients';
import { getSessionUser } from '../../../store/session';
import { addToPantry, removeFromPantry, pantrySelectors } from '../../../store/pantry';

const Pantry = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getSessionUser);
  const ingredients = useSelector(ingredientsSelectors.selectAll);
  const pantry = useSelector(pantrySelectors.selectAll);
  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState(false);

  const options = ingredients.filter(il => !pantry.some(i => i.id === il.id));

  const reset = () => {
    setInput('');
    setAddList([]);
    setRemoveList([]);
    setEdit(false);
  };

  const confirm = async () => {
    if (addList.length) {
      await dispatch(addToPantry({ userId: sessionUser.id, ingredients: addList }));
    }
    if (removeList.length) {
      await dispatch(removeFromPantry({ userId: sessionUser.id, ingredients: removeList }));
    }

    reset();
  };

  return (
    <Drawer
      id="pantry"
      variant="permanent"
      anchor="right"
      sx={{
        width: 350,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 350, p: 3, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      {edit && (
        <>
          <Autocomplete
            multiple
            id="searchIngredients"
            options={options}
            value={addList}
            onChange={(e, newValue) => setAddList(newValue)}
            inputValue={input}
            onInputChange={(e, newInputValue) => setInput(newInputValue)}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Search for ingredients"
              />
            )}
            renderTags={() => null}
          />
          <Box>
            <Typography>To be added:</Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                display: 'flex',
                justifyContent: 'start',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {addList.map(ingredient => (
                <Chip
                  key={ingredient.name}
                  component="li"
                  icon={ingredient.verified && <Verified fontSize="small" />}
                  label={ingredient.name}
                  onDelete={() => setAddList(prev => prev.filter(i => i.name !== ingredient.name))}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Typography>To be removed:</Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                display: 'flex',
                justifyContent: 'start',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {removeList.map(ingredient => (
                <Chip
                  key={ingredient.name}
                  component="li"
                  icon={ingredient.verified && <Verified fontSize="small" />}
                  label={ingredient.name}
                  onDelete={() => setRemoveList(prev => prev
                    .filter(i => i.name !== ingredient.name))}
                />
              ))}
            </Box>
          </Box>
        </>
      )}
      <Box>
        <Typography>My ingredients:</Typography>
        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            display: 'flex',
            justifyContent: 'start',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {pantry.filter(i => !removeList.some(r => r.id === i.id)).map(ingredient => (
            <Chip
              key={ingredient.name}
              component="li"
              icon={ingredient.verified && <Verified fontSize="small" />}
              label={ingredient.name}
              onDelete={edit ? () => setRemoveList(prev => [...prev, ingredient]) : undefined}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{
        position: 'absolute',
        bottom: 24,
      }}
      >
        {edit ? (
          <>
            <Button
              variant="contained"
              onClick={confirm}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              onClick={reset}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default Pantry;
