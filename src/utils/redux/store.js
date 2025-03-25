import { configureStore } from "@reduxjs/toolkit";
import CurrentUserReducer from "./currentUser/reducer";
import pageLoaderReducer from "./loader/reducer";
import CommonReducers from "./common/reducer";
// Example slice

export const store = configureStore({
  reducer: {
    currentUser: CurrentUserReducer,
    pageLoader: pageLoaderReducer,
    common: CommonReducers,
  },
});
