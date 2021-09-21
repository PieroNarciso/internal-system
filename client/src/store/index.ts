import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/user';
import ordenReducer from '@/store/orden';
import businessReducer from '@/store/business';

export const store = configureStore({
  reducer: {
    user: userReducer,
    orden: ordenReducer,
    business: businessReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
