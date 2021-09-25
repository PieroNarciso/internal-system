import { Orden, OrdenDetail } from '@/interfaces/orden.interface';
import { createSlice } from '@reduxjs/toolkit';
import { createOrden, fetchOrdenes } from './orden.thunks';

interface OrdenState {
  ordenes: Orden[];
  currentOrden?: OrdenDetail;
}

const initialState: OrdenState = {
  ordenes: [],
};

const ordenSlice = createSlice({
  name: 'orden',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdenes.fulfilled, (state, action) => {
        state.ordenes = action.payload;
      })
      .addCase(createOrden.fulfilled, (state, action) => {
        state.ordenes = [action.payload, ...state.ordenes];
      });
  },
});

export const ordenActions = ordenSlice.actions;
export default ordenSlice.reducer;
