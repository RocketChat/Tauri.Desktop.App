// create store here export outside
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootreducer";

export default configureStore({
  reducer: rootReducer,
})
