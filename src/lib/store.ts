import { configureStore } from '@reduxjs/toolkit';
import config from './slices/config';
import wallets from './slices/wallets';

const store = configureStore({
  reducer: {
    wallets,
    config,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
