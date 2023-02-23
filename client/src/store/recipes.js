import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchLikedRecipes } from './session';

export const getRecipes = createAsyncThunk(
  'recipes/get',
  async () => {
    const res = await axios.get('/api/recipes');

    return res.data.recipes;
  },
);

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipe, { getState, rejectWithValue }) => {
    try {
      const { session: { user: { id } } } = getState();
      const res = await axios.post(`/api/users/${id}/recipes`, recipe);

      return res.data.recipe;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (recipe, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/recipes/${recipe.id}`, recipe);

      return res.data.recipe;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const removeRecipe = createAsyncThunk(
  'recipes/remove',
  async (id) => {
    await axios.delete(`/api/recipes/${id}`);

    return id;
  },
);

export const likeRecipe = createAsyncThunk(
  'recipes/likes/add',
  async ({ id, userId }, { dispatch }) => {
    const res = await axios.post(`/api/recipes/${id}/likes`, { userId });

    await dispatch(fetchLikedRecipes());

    return { id, changes: { likes: res.data.likes } };
  },
);

export const unlikeRecipe = createAsyncThunk(
  'recipes/likes/remove',
  async ({ id, userId }, { dispatch }) => {
    const res = await axios.delete(`/api/recipes/${id}/likes`, { data: { userId } });

    await dispatch(fetchLikedRecipes());

    return { id, changes: { likes: res.data.likes } };
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
        recipesAdapter.upsertOne(state, payload);
      })
      .addCase(removeRecipe.fulfilled, (state, { payload }) => {
        recipesAdapter.removeOne(state, payload);
      })
      .addCase(likeRecipe.fulfilled, (state, { payload }) => {
        recipesAdapter.updateOne(state, payload);
      })
      .addCase(unlikeRecipe.fulfilled, (state, { payload }) => {
        recipesAdapter.updateOne(state, payload);
      });
  },
});

export const recipesSelectors = recipesAdapter.getSelectors(state => state.recipes);

export const getRecipesByUser = (state, user) => recipesSelectors
  .selectAll(state).filter(recipe => recipe.user.id === user?.id);

export default recipesSlice.reducer;
