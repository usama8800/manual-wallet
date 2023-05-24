import { EntityState, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { price } from '../blockchain';
import { SliceStatus } from '../utils';
import { PriceApi } from './config';

export class Network {
  status: SliceStatus;
  error: any;
  symbol: string;
  price: number;

  constructor(symbol: string) {
    this.symbol = symbol;
    this.status = 'idle';
    this.error = null;
    this.price = 0;
  }
}
export interface NetworksState {
  networks: Network[];
}

const networksAdapter = createEntityAdapter<Network>({
  sortComparer: (a, b) => b.symbol.localeCompare(a.symbol)
});


const initialSymbols = ['btc', 'eth'];
const initialState = networksAdapter.getInitialState();

export const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPrice.pending, (state, action) => {
        state.entities[action.meta.arg.network.symbol]!.status = 'pending';
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.entities[action.meta.arg.network.symbol]!.price = action.payload;
        state.entities[action.meta.arg.network.symbol]!.status = 'fulfilled';
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.entities[action.meta.arg.network.symbol]!.status = 'rejected';
        state.entities[action.meta.arg.network.symbol]!.error = action.error.message;
      });
  }
});

networksAdapter.addMany(initialState, initialSymbols.map(symbol => new Network(symbol)));

export const fetchPrice = createAsyncThunk('networks/fetchPrice', async (data: { api: PriceApi, network: Network }) => {
  const p = await price(data.api, data.network);
  return p;
});

// Action creators are generated for each case reducer function
// export const { } = networksSlice.actions;
export default networksSlice.reducer;

export const selectAllNetworks = (state: EntityState<Network>) => networksAdapter.getSelectors().selectAll(state);
export const selectNetwork = (network: Network) =>
  (state: EntityState<Network>) => networksAdapter.getSelectors().selectById(state, network.symbol);
