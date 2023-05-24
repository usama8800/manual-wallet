import { createSlice } from '@reduxjs/toolkit';

export type BalanceApi = 'blockcypher';
export type PriceApi = 'blockcypher';

export interface ConfigState {
  balanceApi: BalanceApi;
  priceApi: PriceApi;
}

const initialState: ConfigState = {
  balanceApi: 'blockcypher',
  priceApi: 'blockcypher',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {

  },
});

// Action creators are generated for each case reducer function
// export const { } = configSlice.actions;
export default configSlice.reducer;
