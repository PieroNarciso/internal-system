import { User } from '@/interfaces/user.interface';
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './user.thunks';

interface UserState extends Partial<User> {
  isAuthenticated: boolean,
}

const initialState: UserState = {
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.uuid = action.payload.uuid;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
