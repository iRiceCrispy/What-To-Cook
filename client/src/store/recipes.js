import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getRecipes = createAsyncThunk(
  'recipes/get',
  async () => {
    const res = await axios.get('/api/recipes');

    return res.data.recipes;
  },
);

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async ({ userId, recipe }) => {
    const res = await axios.post(`/api/users/${userId}/recipes`, recipe);

    return res.data.recipe;
  },
);

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (recipe) => {
    const res = await axios.put(`/api/recipes/${recipe.id}`, recipe);

    return res.data.recipe;
  },
);

export const removeRecipe = createAsyncThunk(
  'recipes/remove',
  async (id) => {
    await axios.delete(`/api/recipes/${id}`);

    return id;
  },
);

const recipesAdapter = createEntityAdapter();
const initialState = recipesAdapter.getInitialState();

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.fulfilled, recipesAdapter.setAll)
      .addCase(addRecipe.fulfilled, (state, { payload }) => {
        recipesAdapter.addOne(state, payload);
      })
      .addCase(updateRecipe.fulfilled, (state, { payload }) => {
        recipesAdapter.updateOne(state, payload);
      })
      .addCase(removeRecipe.fulfilled, (state, { payload }) => {
        recipesAdapter.removeOne(state, { payload });
      });
  },
});

export const recipesSelectors = recipesAdapter.getSelectors(state => state.recipes);

export default recipesSlice.reducer;
