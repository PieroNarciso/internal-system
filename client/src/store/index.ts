import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/user.store';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
