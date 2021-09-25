import { createSlice } from '@reduxjs/toolkit';

import { Business } from '@/interfaces/business.interface';
import { createBusinessEntry, fetchBusinessEntries } from './business.thunks';

interface BusinessState {
  businesses: Business[];
}

const initialState: BusinessState = {
  businesses: [],
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessEntries.fulfilled, (state, action) => {
        state.businesses = action.payload;
      })
      .addCase(createBusinessEntry.fulfilled, (state, action) => {
        state.businesses.push(action.payload);
      });
  },
});

export const businessActions = businessSlice.actions;
export default businessSlice.reducer;
