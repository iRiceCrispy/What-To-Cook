import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getUserIngredients = createAsyncThunk(
  'user/ingredients/get',
  async (userId) => {
    const res = await axios.get(`/api/users/${userId}/ingredients`);

    return res.data.ingredients;
  },
);

const userIngredientsAdapter = createEntityAdapter();
const initialState = userIngredientsAdapter.getInitialState();

const userIngredientsSlice = createSlice({
  name: 'user/ingredients',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserIngredients.fulfilled, userIngredientsAdapter.setAll);
  },
});

export const userIngredientsSelectors = userIngredientsAdapter
  .getSelectors(state => state.userIngredients);

export default userIngredientsSlice.reducer;
