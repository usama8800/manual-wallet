import { EntityState, PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { balance } from '../blockchain';
import { SliceStatus } from '../utils';
import { BalanceApi } from './config';

export interface Wallet {
  id: number;
  networkSymbol: string;
  name: string;
  address: string;
  amountCoins: number;
  status: SliceStatus;
  error: any;
}
export const defaultWallet = {
  amountCoins: 0,
  error: null as any,
  status: 'idle' as SliceStatus,
};

const walletsAdapter = createEntityAdapter<Wallet>({
  sortComparer: (a, b) => b.address.localeCompare(a.address),
});
const initialState = walletsAdapter.getInitialState();

export const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
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
      });
  }
});

export const fetchAmount = createAsyncThunk('wallets/fetchAmount', async (data: { api: BalanceApi, wallet: Wallet }) => {
  const b = await balance(data.api, data.wallet.networkSymbol, data.wallet.address);
  return b;
});

// Action creators are generated for each case reducer function
export const { setWallets } = walletsSlice.actions;
export default walletsSlice.reducer;
export const selectAllWallets = (state: { wallets: EntityState<Wallet> }) => walletsAdapter.getSelectors().selectAll(state.wallets);
export const selectWallet = (id: number) =>
  (state: { wallets: EntityState<Wallet> }) => walletsAdapter.getSelectors().selectById(state.wallets, id);
