import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Business } from '@/interfaces/business.interface'

interface BusinessState {
  business: Business[];
}

const initialState: BusinessState = {
  business: [],
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    replaceBusiness(state, action: PayloadAction<Business[]>) {
      state.business = action.payload.sort((a, b) => {
        if (a.razonSocial < b.razonSocial) return -1;
        else if (a.razonSocial > b.razonSocial) return 1;
        else return 0;
      });
    },
  }
});

export const businessActions = businessSlice.actions;
export default businessSlice.reducer;
