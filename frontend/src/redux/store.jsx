import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { todosSlice } from "./reducers/todoSlider";


const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
  // middleware: [thunk],
});

export default store;
