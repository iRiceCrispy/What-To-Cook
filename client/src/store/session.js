import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const restoreSession = createAsyncThunk(
  'session/restore',
  async () => {
    const res = await axios.get('/api/session');

    return res.data.user;
  },
);

export const login = createAsyncThunk(
  'session/login',
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/session/login', {
        credential,
        password,
      });

      return res.data.user;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const demo = createAsyncThunk(
  'session/demo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/session/demo');

      return res.data.user;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const signup = createAsyncThunk(
  'session/signup',
  async ({ username, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/session/signup', {
        username,
        email,
        password,
        confirmPassword,
      });

      return res.data.user;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const logout = createAsyncThunk(
  'session/logout',
  async () => {
    await axios.delete('/api/session');
  },
);

export const fetchLikedRecipes = createAsyncThunk(
  'session/likedRecipes/get',
  async (_, { getState }) => {
    const { user } = getState().session;

    if (user) {
      const res = await axios.get(`/api/users/${user.id}/liked_recipes`);

      return res.data.recipes;
    }

    return [];
  },
);

const initialState = {
  user: null,
  likedRecipes: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(demo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchLikedRecipes.fulfilled, (state, { payload }) => {
        state.likedRecipes = payload;
      });
  },
});

export const getSessionUser = state => state.session.user;
export const getLikedRecipes = state => state.session.likedRecipes;

export default sessionSlice.reducer;
