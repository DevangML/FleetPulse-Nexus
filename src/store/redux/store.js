import { configureStore } from '@reduxjs/toolkit';
import fleetReducer from './fleetSlice.js';

export const reduxStore = configureStore({
  reducer: {
    fleet: fleetReducer,
  },
});
