import { createSlice } from "@reduxjs/toolkit";

export const ProfileUpdateSlice = createSlice({
  name: "ProfileUpdate",
  initialState: {
    ProfileUpdateFlag: false,
  },
  reducers: {
    getProfileUpdateFlag: (state, action) => {
      state.ProfileUpdateFlag = action.payload;
    },
  },
});

export const { getProfileUpdateFlag } = ProfileUpdateSlice.actions;

export default ProfileUpdateSlice.reducer;
