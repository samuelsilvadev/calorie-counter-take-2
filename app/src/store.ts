import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { foodsReducer } from "foods/state";
import { notificationsReducer } from "notifications/state";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSafeSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSafeDispatch = () => useDispatch<AppDispatch>();
