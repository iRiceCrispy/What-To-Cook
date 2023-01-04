import { configureStore } from '@reduxjs/toolkit';
import session from './session';

const store = configureStore({
  reducer: {
    session,
  },
});

export default store;
