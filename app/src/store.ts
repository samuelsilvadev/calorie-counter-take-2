import { configureStore } from "@reduxjs/toolkit";

import foodsReducer from "foods/state";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
