import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllErrorFE } from "shared/types/api";
import { FavoriteFood } from "./types";

type SaveFavoriteFoodState = {
  loading: boolean;
  error: GetAllErrorFE | null;
  favorites: Record<string, boolean>;
};

export type GetAllFavoriteFoodsOkAction = PayloadAction<{
  foodIds: FavoriteFood[];
}>;
export type GetAllFavoriteFoodsErrorAction = PayloadAction<{
  error: GetAllErrorFE;
}>;
export type SaveFavoriteFoodsAction = PayloadAction<{ foodId: string }>;
export type SaveFavoriteFoodsOkAction = PayloadAction<{ foodId: string }>;
export type SaveFavoriteFoodsErrorAction = PayloadAction<{
  foodId: string;
  error: GetAllErrorFE;
}>;

const saveInitialState: SaveFavoriteFoodState = {
  loading: false,
  error: null,
  favorites: {},
};

const saveFavoriteFoodReducer: CaseReducer<
  SaveFavoriteFoodState,
  SaveFavoriteFoodsAction
> = (favoriteFoodsState, action) => {
  const { foodId } = action.payload;

  favoriteFoodsState.loading = true;
  favoriteFoodsState.error = null;
  favoriteFoodsState.favorites[foodId] = true;
};

const saveFavoriteFoodSlice = createSlice({
  name: "saveFavoriteFood",
  initialState: saveInitialState,
  reducers: {
    saveFavoriteFood: saveFavoriteFoodReducer,
    saveFavoriteFoodOK: (
      favoriteFoodsState: SaveFavoriteFoodState,
      action: SaveFavoriteFoodsOkAction
    ) => {
      const { foodId } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[foodId] = true;
    },
    saveFavoriteFoodError: (
      favoriteFoodsState: SaveFavoriteFoodState,
      action: SaveFavoriteFoodsErrorAction
    ) => {
      const { foodId, error } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[foodId] = false;
      favoriteFoodsState.error = error;
    },
    getAllFavoriteFoodsOK: (
      favoriteFoodsState: SaveFavoriteFoodState,
      action: GetAllFavoriteFoodsOkAction
    ) => {
      favoriteFoodsState.loading = false;

      action.payload.foodIds.forEach((favoriteFood) => {
        favoriteFoodsState.favorites[favoriteFood.food] = true;
      });
    },
    getAllFavoriteFoodsError: (
      favoriteFoodsState: SaveFavoriteFoodState,
      action: GetAllFavoriteFoodsErrorAction
    ) => {
      favoriteFoodsState.loading = false;
      favoriteFoodsState.error = action.payload.error;
    },
  },
});

export const {
  saveFavoriteFood,
  saveFavoriteFoodOK,
  saveFavoriteFoodError,
  getAllFavoriteFoodsOK,
  getAllFavoriteFoodsError,
} = saveFavoriteFoodSlice.actions;

export const favoriteFoodsReducer = saveFavoriteFoodSlice.reducer;
