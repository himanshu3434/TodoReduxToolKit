import { configureStore } from "@reduxjs/toolkit";
import todoReducers from "../features/todo/todoSlice";
export const store1 = configureStore({
  reducer: todoReducers,
});
