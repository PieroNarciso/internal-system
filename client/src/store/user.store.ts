import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username?: string,
  email?: string,
  role?: string,
}

const initialState: UserState = {
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  }
});

export default userSlice.reducer;
