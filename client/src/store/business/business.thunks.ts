import { Business, BusinessCreate } from '@/interfaces/business.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';


export const createBusinessEntry = createAsyncThunk(
  'empresas/create',
  async (payload: BusinessCreate) => {
    const response = await api.post<Business>('/empresas', { ...payload });
    return response.data;
  }
);

export const fetchBusinessEntries = createAsyncThunk(
  'empresas/fetch',
  async () => {
    const response = await api.get<Business[]>('/empresas');
    return response.data;
  }
);
