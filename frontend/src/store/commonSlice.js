import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleSidebar } = commonSlice.actions;

export default commonSlice.reducer;
