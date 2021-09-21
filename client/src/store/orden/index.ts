import { Orden, OrdenDetail } from '@/interfaces/orden.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    addOrden(state, action: PayloadAction<Orden>) {
      state.ordenes = [action.payload, ...state.ordenes];
    },
    removeOrden(state, action: PayloadAction<Orden['id']>) {
      state.ordenes = state.ordenes.filter(
        (orden) => orden.id !== action.payload
      );
    },
    setCurrentOrden(state, action: PayloadAction<OrdenDetail>) {
      state.currentOrden = { ...action.payload }
    }
  },
});

export const ordenActions = ordenSlice.actions;
export default ordenSlice.reducer;
