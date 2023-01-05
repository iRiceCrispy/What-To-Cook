import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async () => {
    const res = await axios.get('/api/ingredients');

    return res.data.ingredients;
  },
);

const ingredientsAdapter = createEntityAdapter();

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, ingredientsAdapter.setAll);
  },
});

export const ingredientsSelectors = ingredientsAdapter.getSelectors(state => state.ingredients);

export default ingredientsSlice.reducer;
