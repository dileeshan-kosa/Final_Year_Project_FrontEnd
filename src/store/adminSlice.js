import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state.admin = action.payload;
      console.log("adminDetails", action.payload);
    },
  },
});

// // Action creators are generated for each case reducer function
export const { setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;
