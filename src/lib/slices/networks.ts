import { EntityState, PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { price } from '../blockchain';
import { SliceStatus } from '../utils';
import { PriceApi } from './config';

export interface Network {
  status: SliceStatus;
  error: any;
  symbol: string;
  name: string;
  price: number;
}
export const defaultNetwork = {
  price: 0,
  error: null as any,
  status: 'idle' as SliceStatus,
};

const networksAdapter = createEntityAdapter<Network>({
  sortComparer: (a, b) => b.symbol.localeCompare(a.symbol),
  selectId: (network) => network.symbol,
});
const initialState = networksAdapter.getInitialState({
  error: null as any,
  status: 'idle' as SliceStatus,
});

export const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    setNetworks: (state, action: PayloadAction<Network[]>) => {
      networksAdapter.setAll(state, action.payload);
    },
  },
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
      })
      .addCase(fetchAllNetworks.pending, (state, _) => {
        state.status = 'pending';
      })
      .addCase(fetchAllNetworks.fulfilled, (state, action) => {
        networksAdapter.setAll(state, action.payload.map((network) => ({
          ...defaultNetwork,
          ...network
        })));
        state.status = 'fulfilled';
      })
      .addCase(fetchAllNetworks.rejected, (state, action) => {
        state.status = 'pending';
        state.error = action.error.message;
      });
  }
});

export const fetchAllNetworks = createAsyncThunk('networks/fetchAll', async () => {
  const networks = await window.electron.getNetworks();
  return networks;
});
export const fetchPrice = createAsyncThunk('networks/fetchPrice', async (data: { api: PriceApi, network: Network }) => {
  const p = await price(data.api, data.network.symbol);
  return p;
});

// Action creators are generated for each case reducer function
export const { setNetworks } = networksSlice.actions;
export default networksSlice.reducer;

export const selectAllNetworks = (state: { networks: EntityState<Network> }) => networksAdapter.getSelectors().selectAll(state.networks);
export const selectNetwork = (symbol: string) =>
  (state: { networks: EntityState<Network> }) => networksAdapter.getSelectors().selectById(state.networks, symbol);
