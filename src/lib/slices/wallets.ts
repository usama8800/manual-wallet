import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { balance } from '../blockchain';

export interface Wallet {
  network: {
    name: string,
    symbol: string,
  },
  name: string,
  address: string,
  amountCoins: number,
};
export interface WalletsState {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: any;
  wallets: Wallet[];
}

const initialState: WalletsState = {
  status: 'idle',
  error: null,
  wallets: [
    {
      network: {
        name: "Ethereum",
        symbol: "eth",
      },
      name: "MetaMask",
      address: "0x8624613061799e9472e4e4579e88afa39d8887ab",
      amountCoins: 0,
    },
    {
      network: {
        name: "Bitcoin",
        symbol: "btc",
      },
      name: "Electrum",
      address: "186zeVrx7hXe9iiXk9oS48cSKe4QPwXMgm",
      amountCoins: 0,
    },
  ],
};

export const counterSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAmounts.pending, (state, action) => {
        console.log(state, action);
        state.status = 'loading'
      })
      .addCase(fetchAmounts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.wallets.forEach((wallet, index) => {
          wallet.amountCoins = action.payload[index];
        });
      })
      .addCase(fetchAmounts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const fetchAmounts = createAsyncThunk('wallets/fetchAmounts', async (wallets: Wallet[]) => {
  const balances = await Promise.all(wallets.map((w) => balance(w.network.symbol, w.address)))
  return balances;
});

// Action creators are generated for each case reducer function
// export const { } = counterSlice.actions;
export default counterSlice.reducer;
export const selectWallets = (state: { wallets: WalletsState }) => state.wallets.wallets;
export const selectStatus = (state: { wallets: WalletsState }) => state.wallets.status;
