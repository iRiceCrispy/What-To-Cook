import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import recipes from './recipes';
import session from './session';
import pantry from './pantry';

const store = configureStore({
  reducer: {
    session,
    ingredients,
    pantry,
    recipes,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
