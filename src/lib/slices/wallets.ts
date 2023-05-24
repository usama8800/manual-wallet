import { EntityState, PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { balance } from '../blockchain';
import { SliceStatus } from '../utils';
import { BalanceApi } from './config';
import { Network } from './networks';

export interface Wallet {
  network: Network,
  name: string,
  address: string,
  amountCoins: number,
  status: SliceStatus;
  error: any;
}

// const initialState: WalletsState = {
//   status: 'idle',
//   error: null,
//   wallets: [
//     {
//       network: new Network('eth'),
//       name: 'MetaMask',
//       address: '0x8624613061799e9472e4e4579e88afa39d8887ab',
//       amountCoins: 0,
//     },
//     {
//       network: new Network('btc'),
//       name: 'Electrum',
//       address: '186zeVrx7hXe9iiXk9oS48cSKe4QPwXMgm',
//       amountCoins: 0,
//     },
//   ],
// };

const walletsAdapter = createEntityAdapter<Wallet>({
  sortComparer: (a, b) => b.address.localeCompare(a.address)
});
const initialState = walletsAdapter.getInitialState();


export const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAmount.pending, (state, action) => {
        state.entities[action.meta.arg.wallet.address]!.status = 'pending';
      })
      .addCase(fetchAmount.fulfilled, (state, action) => {
        state.entities[action.meta.arg.wallet.address]!.status = 'fulfilled';
        state.entities[action.meta.arg.wallet.address]!.amountCoins = action.payload;
      })
      .addCase(fetchAmount.rejected, (state, action) => {
        state.entities[action.meta.arg.wallet.address]!.status = 'rejected';
        state.entities[action.meta.arg.wallet.address]!.error = action.error.message;
      });
  }
});

export const fetchAmount = createAsyncThunk('wallets/fetchAmount', async (data: { api: BalanceApi, wallet: Wallet }) => {
  const b = await balance(data.api, data.wallet.network, data.wallet.address);
  return b;
});

// Action creators are generated for each case reducer function
// export const { } = walletsSlice.actions;
export default walletsSlice.reducer;
export const selectAllWallets = (state: EntityState<Wallet>) => walletsAdapter.getSelectors().selectAll(state);
export const selectWallet = (wallet: Wallet) =>
  (state: EntityState<Wallet>) => walletsAdapter.getSelectors().selectById(state, wallet.address);
