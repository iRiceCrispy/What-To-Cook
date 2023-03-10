import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getPantry = createAsyncThunk(
  'pantry/get',
  async (userId) => {
    const res = await axios.get(`/api/users/${userId}/pantry`);

    return res.data.pantry;
  },
);

export const updatePantry = createAsyncThunk(
  'pantry/update',
  async ({ userId, ingredients }) => {
    const res = await axios.put(`/api/users/${userId}/pantry`, { ingredients });

    return res.data.pantry;
  },
);

const pantryAdapter = createEntityAdapter();
const initialState = pantryAdapter.getInitialState();

const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPantry.fulfilled, pantryAdapter.setAll)
      .addCase(updatePantry.fulfilled, pantryAdapter.setAll);
  },
});

export const pantrySelectors = pantryAdapter
  .getSelectors(state => state.pantry);

export default pantrySlice.reducer;
