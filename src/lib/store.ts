import { configureStore } from '@reduxjs/toolkit';
import config from './slices/config';
import networks from './slices/networks';
import wallets from './slices/wallets';

const store = configureStore({
  reducer: {
    networks,
    wallets,
    config,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
