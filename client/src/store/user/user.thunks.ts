import { User, UserLogin } from '@/interfaces/user.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/api';

export const loginUser = createAsyncThunk(
  'users/login',
  async (userData: UserLogin) => {
    const response = await api.post<User>('/users/login', userData);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  'users/logout',
  async () => {
    const response = await api.post('/users/logout');
    return response.status;
  }
);
