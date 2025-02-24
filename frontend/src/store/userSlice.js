import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state?.currentUser?.subscribedChannels?.includes(action.payload)) {
        state?.currentUser?.subscribedChannels?.splice(
          state?.currentUser?.subscribedChannels?.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
        state.currentUser.subscribers -= 1;
      } else {
        state?.currentUser?.subscribedChannels?.push(action.payload);
        state.currentUser.subscribers += 1;
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
