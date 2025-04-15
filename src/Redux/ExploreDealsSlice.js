import { createSlice } from "@reduxjs/toolkit";
export const ExploreDealsSlice = createSlice({
  name: "ExploreDealMarketplace",
  initialState: {
    ExploreDealMarketplace: "",
    pageNumber: 0,
  },
  reducers: {
    getExploreDealMarketplace: (state, action) => {
      state.ExploreDealMarketplace = parseInt(action.payload);
    },
    getPageNumber: (state, action) => {
      state.pageNumber = parseInt(action.payload);
    },
  },
});

export const { getExploreDealMarketplace, getPageNumber } =
  ExploreDealsSlice.actions;

export default ExploreDealsSlice.reducer;
