import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import session from './session';
import userIngredients from './userIngredients';

const store = configureStore({
  reducer: {
    session,
    ingredients,
    userIngredients,
  },
});

export default store;
