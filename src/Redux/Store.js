import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import ExploreDealMarketplaceReducer from "./ExploreDealsSlice"; // used
import ChatFlagReducer from "./ChatFlagSlice"; // used
import ProfileUpdateReducer from "./ProfileUpdateSlice"; // used

const persistConfigTwo = {
  key: "root2",
  version: 1,
  storage,
};

const reducertwo = combineReducers({
  ExploreMarketplace: ExploreDealMarketplaceReducer,
});

const persistedReducerTwo = persistReducer(persistConfigTwo, reducertwo);

const store = configureStore({
  reducer: {
    ChatFlag: ChatFlagReducer,
    ProfileUpdateFlag: ProfileUpdateReducer,
    CouponAndVoucherDetail: persistedReducerTwo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
