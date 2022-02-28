import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food } from "foods/types";
import type { SaveErrorFE } from "shared/types/api";
import type { CreateFood } from "./types";

type NewFoodState = {
  error: SaveErrorFE | null;
  loading: boolean;
};

export type SaveFoodAction = PayloadAction<{ food: CreateFood }>;
export type SaveFoodOkAction = PayloadAction<{ food: Food }>;
export type SaveFoodErrorAction = PayloadAction<{ error: SaveErrorFE }>;

const saveFoodCaseReducer: CaseReducer<NewFoodState, SaveFoodAction> = (
  state
) => {
  state.loading = true;
  state.error = null;
};

const saveFoodOKCaseReducer: CaseReducer<NewFoodState, SaveFoodOkAction> = (
  state
) => {
  state.loading = false;
  state.error = null;
};

const initialState: NewFoodState = {
  error: null,
  loading: false,
};

const newFoodSlice = createSlice({
  name: "newFood",
  initialState,
  reducers: {
    saveFood: saveFoodCaseReducer,
    saveFoodOK: saveFoodOKCaseReducer,
    saveFoodError(state: NewFoodState, action: SaveFoodErrorAction) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { saveFood, saveFoodOK, saveFoodError } = newFoodSlice.actions;

export const saveFoodReducer = newFoodSlice.reducer;
