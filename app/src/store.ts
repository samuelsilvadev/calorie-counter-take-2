import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { foodsReducer } from "foods/state";
import { notificationsReducer } from "notifications/state";
import { foodDetailsReducer } from "food-details/state";
import { favoriteFoodsReducer } from "favorite-foods/state";
import { userReducer } from "user/state";
import { saveFoodReducer } from "new-food/state";
import { rootSaga } from "rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    favoriteFoods: favoriteFoodsReducer,
    foods: foodsReducer,
    food: foodDetailsReducer,
    notifications: notificationsReducer,
    user: userReducer,
    saveFood: saveFoodReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSafeSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSafeDispatch = () => useDispatch<AppDispatch>();
