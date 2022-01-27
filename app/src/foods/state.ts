import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food, GetAllFoodsAPIResponseError } from "./types";

type FoodsState = {
  error: GetAllFoodsAPIResponseError | null;
  loading: boolean;
  foods: Food[];
};

export type GetAllFoodsOkAction = PayloadAction<{ foods: Food[] }>;
export type GetAllFoodsErrorAction = PayloadAction<GetAllFoodsAPIResponseError>;

const initialState: FoodsState = {
  error: null,
  loading: false,
  foods: [],
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    getAllFoods: (state: FoodsState) => {
      state.loading = true;
    },
    getAllFoodsOK: (state: FoodsState, action: GetAllFoodsOkAction) => {
      state.loading = false;
      state.foods = action.payload.foods;
    },
    getAllFoodsError: (state: FoodsState, action: GetAllFoodsErrorAction) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getAllFoods, getAllFoodsOK, getAllFoodsError } =
  foodsSlice.actions;

export const foodsReducer = foodsSlice.reducer;
