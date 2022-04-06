import { configureStore } from '@reduxjs/toolkit';
import state from './slice'

export const store = configureStore({
  reducer: {
    state
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;