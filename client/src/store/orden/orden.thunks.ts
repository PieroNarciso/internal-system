import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';
import { Orden, OrdenCreate, OrdenDetail } from '@/interfaces/orden.interface';
import { ItemCreate, Item } from '@/interfaces/item.interface';
import { HistoryCreate } from '@/interfaces/history.interface';

export const fetchOrdenes = createAsyncThunk('ordenes/fetch', async () => {
  const response = await api.get<Orden[]>('/ordenes');
  return response.data;
});

export const fetchOrdenById = createAsyncThunk(
  'ordenes/fetchById',
  async (payload: Orden['id']) => {
    const response = await api.get<OrdenDetail>(`/ordenes/${payload}`);
    return response.data;
  }
);

export const createOrden = createAsyncThunk(
  'ordenes/create',
  async (payload: OrdenCreate) => {
    const response = await api.post<Orden>('/ordenes', payload);
    return response.data;
  }
);

export const addNewItemToOrden = createAsyncThunk(
  'ordenes/addItem',
  async (payload: { ordenId: Orden['id']; item: ItemCreate }) => {
    const response = await api.post<Item>(
      `/ordenes/${payload.ordenId}/items`,
      payload.item
    );
    return response.data;
  }
);

export const addHistoryToItem = createAsyncThunk(
  'ordenes/addHistory',
  async (payload: {
    ordenId: Orden['id'];
    itemId: Item['id'];
    history: HistoryCreate;
  }) => {
    const response = await api.post<History>(
      `/ordenes/${payload.ordenId}/items/${payload.itemId}`,
      payload.history
    );
    return response.data;
  }
);
