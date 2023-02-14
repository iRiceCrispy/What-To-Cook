import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import recipes from './recipes';
import session from './session';
import userIngredients from './userIngredients';

const store = configureStore({
  reducer: {
    session,
    ingredients,
    userIngredients,
    recipes,
  },
});

export default store;
