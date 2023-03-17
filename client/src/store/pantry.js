import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getPantry = createAsyncThunk(
  'pantry/get',
  async (_, { getState }) => {
    const { user } = getState().session;

    if (user) {
      const res = await axios.get(`/api/users/${user.id}/pantry`);

      return res.data.pantry;
    }

    return [];
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
