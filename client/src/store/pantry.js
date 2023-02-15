import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getPantry = createAsyncThunk(
  'pantry/get',
  async (userId) => {
    const res = await axios.get(`/api/users/${userId}/pantry`);

    return res.data.pantry;
  },
);

export const addToPantry = createAsyncThunk(
  'pantry/add',
  async ({ userId, ingredients }) => {
    const res = await axios.post(`/api/users/${userId}/pantry`, { ingredients });

    return res.data.pantry;
  },
);

export const removeFromPantry = createAsyncThunk(
  'pantry/remove',
  async ({ userId, ingredients }) => {
    const res = await axios.delete(`/api/users/${userId}/pantry`, { data: { ingredients } });

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
      .addCase(addToPantry.fulfilled, pantryAdapter.setAll)
      .addCase(removeFromPantry.fulfilled, pantryAdapter.setAll);
  },
});

export const pantrySelectors = pantryAdapter
  .getSelectors(state => state.pantry);

export default pantrySlice.reducer;
