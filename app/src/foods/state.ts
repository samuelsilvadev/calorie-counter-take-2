import { createSlice } from "@reduxjs/toolkit";

type FoodsState = {
  error: Error | null;
  loading: boolean;
  foods: [];
};

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
    getAllFoodsOK: (state: FoodsState, action) => {
      state.loading = false;
      state.foods = action.payload.foods;
    },
    getAllFoodsError: (state: FoodsState, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { getAllFoods, getAllFoodsOK, getAllFoodsError } =
  foodsSlice.actions;

export const foodsReducer = foodsSlice.reducer;
