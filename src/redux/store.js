import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import postReduecer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
const reducer = combineReducers({
  posts: postReduecer,
  users: userReducer,
});
const store = configureStore({
  reducer,
});
export default store;
