import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllErrorFE, RemoveErrorFE, SaveErrorFE } from "shared/types/api";
import { FavoriteFood } from "./types";

type SaveFavoriteFoodState = {
  loading: boolean;
  error: GetAllErrorFE | SaveErrorFE | RemoveErrorFE | null;
  favorites: Record<string, boolean>;
  synchronizedFavorites: Record<string, FavoriteFood>;
};

export type GetAllFavoriteFoodsOkAction = PayloadAction<{
  foods: FavoriteFood[];
}>;
export type GetAllFavoriteFoodsErrorAction = PayloadAction<{
  error: GetAllErrorFE;
}>;

export type SaveFavoriteFoodsAction = PayloadAction<{ foodId: string }>;
export type SaveFavoriteFoodsOkAction = PayloadAction<{
  favoriteFood: FavoriteFood;
}>;
export type SaveFavoriteFoodsErrorAction = PayloadAction<{
  foodId: string;
  error: SaveErrorFE;
}>;

export type RemoveFavoriteFoodsAction = PayloadAction<{
  foodId: string;
}>;
export type RemoveFavoriteFoodsOkAction = PayloadAction<{
  favoriteFood: FavoriteFood;
}>;
export type RemoveFavoriteFoodsErrorAction = PayloadAction<{
  foodId: string;
  error: RemoveErrorFE;
}>;

const saveInitialState: SaveFavoriteFoodState = {
  loading: false,
  error: null,
  favorites: {},
  synchronizedFavorites: {},
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

const favoriteFoodSlice = createSlice({
  name: "favoriteFoods",
  initialState: saveInitialState,
  reducers: {
    saveFavoriteFood: saveFavoriteFoodReducer,
    saveFavoriteFoodOK: (
      favoriteFoodsState,
      action: SaveFavoriteFoodsOkAction
    ) => {
      const { favoriteFood } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[favoriteFood.food] = true;
      favoriteFoodsState.synchronizedFavorites[favoriteFood.food] =
        favoriteFood;
    },
    saveFavoriteFoodError: (
      favoriteFoodsState,
      action: SaveFavoriteFoodsErrorAction
    ) => {
      const { foodId, error } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[foodId] = false;
      favoriteFoodsState.error = error;
    },
    removeFavoriteFood: (
      favoriteFoodsState,
      action: RemoveFavoriteFoodsAction
    ) => {
      favoriteFoodsState.loading = true;
      favoriteFoodsState.favorites[action.payload.foodId] = false;
    },
    removeFavoriteFoodOK: (
      favoriteFoodsState,
      action: RemoveFavoriteFoodsOkAction
    ) => {
      const {
        favoriteFood: { food: foodId },
      } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[foodId] = false;

      delete favoriteFoodsState.synchronizedFavorites[foodId];
    },
    removeFavoriteFoodError: (
      favoriteFoodsState,
      action: RemoveFavoriteFoodsErrorAction
    ) => {
      const { foodId, error } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[foodId] = true;
      favoriteFoodsState.error = error;

      delete favoriteFoodsState.synchronizedFavorites[foodId];
    },
    getAllFavoriteFoodsOK: (
      favoriteFoodsState,
      action: GetAllFavoriteFoodsOkAction
    ) => {
      favoriteFoodsState.loading = false;

      action.payload.foods.forEach((favoriteFood) => {
        favoriteFoodsState.favorites[favoriteFood.food] = true;
        favoriteFoodsState.synchronizedFavorites[favoriteFood.food] =
          favoriteFood;
      });
    },
    getAllFavoriteFoodsError: (
      favoriteFoodsState,
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
  removeFavoriteFood,
  removeFavoriteFoodOK,
  removeFavoriteFoodError,
} = favoriteFoodSlice.actions;

export const favoriteFoodsReducer = favoriteFoodSlice.reducer;
