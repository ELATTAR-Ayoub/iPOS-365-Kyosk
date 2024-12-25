import { configureStore } from "@reduxjs/toolkit";
import UIConfigReducer from "./UIConfig";

export const store = configureStore({
  reducer: {
    UIConfig: UIConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
