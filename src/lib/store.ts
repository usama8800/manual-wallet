import { configureStore } from "@reduxjs/toolkit";
import wallets, { fetchAmounts } from "./slices/wallets";

const store = configureStore({
  reducer: {
    wallets,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

store.dispatch(fetchAmounts(store.getState().wallets.wallets));
