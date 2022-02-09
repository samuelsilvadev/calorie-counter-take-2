import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food } from "foods/types";

export type FoodDetailsItemState = {
  loading: boolean;
  error: null;
  food: Food | null;
};

export type FoodDetailsState = {
  [foodId: string]: FoodDetailsItemState;
};

export type GetFoodAction = PayloadAction<{ id: string }>;
export type GetFoodOkAction = PayloadAction<{ id: string; food: Food }>;

const initialState: FoodDetailsState = {};

const foodDetailsSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    getFood: (state: FoodDetailsState, action: GetFoodAction) => {
      if (state[action.payload.id]?.food) {
        return;
      }

      if (!state[action.payload.id]) {
        state[action.payload.id] = {
          loading: true,
          food: null,
          error: null,
        };
      } else {
        state[action.payload.id].loading = true;
      }
    },
    getFoodOk: (state: FoodDetailsState, action: GetFoodOkAction) => {
      state[action.payload.id] = {
        loading: false,
        food: action.payload.food,
        error: null,
      };
    },
  },
});

export const { getFood, getFoodOk } = foodDetailsSlice.actions;

export const foodDetailsReducer = foodDetailsSlice.reducer;
