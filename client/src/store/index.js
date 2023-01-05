import { configureStore } from '@reduxjs/toolkit';
import session from './session';
import ingredients from './ingredients';

const store = configureStore({
  reducer: {
    ingredients,
    session,
  },
});

export default store;
