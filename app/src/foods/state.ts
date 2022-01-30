import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GetAllError } from "shared/types/api";
import type { Food } from "./types";

type FoodsState = {
  error: GetAllError | null;
  loading: boolean;
  foods: Food[];
};

export type GetAllFoodsOkAction = PayloadAction<{ foods: Food[] }>;
export type GetAllFoodsErrorAction = PayloadAction<GetAllError>;

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
