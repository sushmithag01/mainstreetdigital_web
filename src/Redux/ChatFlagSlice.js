import { createSlice } from "@reduxjs/toolkit";
export const ChatFlagSlice = createSlice({
  name: "Chat Flag",
  initialState: {
    ChatFlagOrder: false,
    ChatFlagGeneral: false,
  },
  reducers: {
    getChatFlagOrderSlice: (state, action) => {
      state.ChatFlagOrder = action.payload;
    },
    getChatFlagGeneralSlice: (state, action) => {
      state.ChatFlagGeneral = action.payload;
    },
  },
});
export const { getChatFlagOrderSlice, getChatFlagGeneralSlice } =
  ChatFlagSlice.actions;
export default ChatFlagSlice.reducer;
