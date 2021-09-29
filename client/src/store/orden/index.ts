import { Orden, OrdenDetail } from '@/interfaces/orden.interface';
import { createSlice } from '@reduxjs/toolkit';
import { createOrden, fetchOrdenById, fetchOrdenes, updateOrden } from './orden.thunks';

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
      })
      .addCase(fetchOrdenById.fulfilled, (state, action) => {
        state.currentOrden = action.payload;
      })
      .addCase(updateOrden.fulfilled, (state, action) => {
        state.currentOrden = action.payload as OrdenDetail;
      });
  },
});

export const ordenActions = ordenSlice.actions;
export default ordenSlice.reducer;
