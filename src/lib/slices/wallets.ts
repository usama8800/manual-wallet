import { Wallet } from '@prisma/client';
import { EntityState, PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { balance } from '../blockchain';
import { SliceStatus } from '../utils';
import { BalanceApi } from './config';

export interface WalletState extends Wallet {
  amountCoins: number;
  status: SliceStatus;
  error: any;
}
export const defaultWallet = {
  amountCoins: 0,
  error: null as any,
  status: 'idle' as SliceStatus,
};

const walletsAdapter = createEntityAdapter<WalletState>({
  sortComparer: (a, b) => b.address.localeCompare(a.address),
});
const initialState = walletsAdapter.getInitialState({
  error: null as any,
  status: 'idle' as SliceStatus,
});

export const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    setWallets: (state, action: PayloadAction<WalletState[]>) => {
      walletsAdapter.setAll(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAmount.pending, (state, action) => {
        state.entities[action.meta.arg.wallet.id]!.status = 'pending';
      })
      .addCase(fetchAmount.fulfilled, (state, action) => {
        state.entities[action.meta.arg.wallet.id]!.status = 'fulfilled';
        state.entities[action.meta.arg.wallet.id]!.amountCoins = action.payload;
      })
      .addCase(fetchAmount.rejected, (state, action) => {
        state.entities[action.meta.arg.wallet.id]!.status = 'rejected';
        state.entities[action.meta.arg.wallet.id]!.error = action.error.message;
      })
      .addCase(fetchAllWallets.pending, (state, _) => {
        state.status = 'pending';
      })
      .addCase(fetchAllWallets.fulfilled, (state, action) => {
        walletsAdapter.upsertMany(state, action.payload.map(wallet => {
          const prev = state.entities[wallet.id];
          return {
            ...(prev ? prev : defaultWallet),
            ...wallet,
          };
        }));
        state.status = 'fulfilled';
      })
      .addCase(fetchAllWallets.rejected, (state, action) => {
        state.status = 'pending';
        state.error = action.error.message;
      });
  }
});

export const fetchAllWallets = createAsyncThunk('wallets/fetchAll', async () => {
  const wallets = await window.electron.getWallets();
  return wallets;
});
export const fetchAmount = createAsyncThunk('wallets/fetchAmount', async (data: { api: BalanceApi, wallet: WalletState }) => {
  const b = await balance(data.api, data.wallet.networkSymbol, data.wallet.address);
  return b;
});

// Action creators are generated for each case reducer function
export const { setWallets } = walletsSlice.actions;
export default walletsSlice.reducer;
export const selectInactiveWallets = (state: { wallets: EntityState<WalletState> }) =>
  walletsAdapter.getSelectors().selectAll(state.wallets).filter((wallet) => wallet.deleted);
export const selectActiveWallets = (state: { wallets: EntityState<WalletState> }) =>
  walletsAdapter.getSelectors().selectAll(state.wallets).filter((wallet) => !wallet.deleted);
export const selectWallet = (id: number) =>
  (state: { wallets: EntityState<WalletState> }) => walletsAdapter.getSelectors().selectById(state.wallets, id);
