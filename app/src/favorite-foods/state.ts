import {
  CaseReducer,
  combineReducers,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { Food } from "foods/types";
import { GetAllErrorFE } from "shared/types/api";

type FavoriteFoodsState = {
  loading: boolean;
  foods: Food[];
  error: GetAllErrorFE | null;
};

type GetAllFavoriteFoodsOkAction = PayloadAction<{ foods: Food[] }>;
type GetAllFavoriteFoodsErrorAction = PayloadAction<{ error: GetAllErrorFE }>;

const listInitialState: FavoriteFoodsState = {
  loading: false,
  error: null,
  foods: [],
};

const favoriteFoodsListSlice = createSlice({
  name: "favoriteFoodsList",
  initialState: listInitialState,
  reducers: {
    getAllFavoriteFoods: (state: FavoriteFoodsState) => {
      state.loading = true;
    },
    getAllFavoriteFoodsOK: (
      state: FavoriteFoodsState,
      action: GetAllFavoriteFoodsOkAction
    ) => {
      state.loading = false;
      state.foods = action.payload.foods;
    },
    getAllFavoriteFoodsError: (
      state: FavoriteFoodsState,
      action: GetAllFavoriteFoodsErrorAction
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getAllFavoriteFoods,
  getAllFavoriteFoodsOK,
  getAllFavoriteFoodsError,
} = favoriteFoodsListSlice.actions;

type SaveFavoriteFoodState = {
  loading: boolean;
  error: GetAllErrorFE | null;
  favorites: Record<string, boolean>;
};

type SaveFavoriteFoodsOkAction = PayloadAction<{ food: Food }>;
type SaveFavoriteFoodsErrorAction = PayloadAction<{
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
  PayloadAction<{ foodId: string }>
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
      const { food } = action.payload;

      favoriteFoodsState.loading = false;
      favoriteFoodsState.favorites[food.id] = true;
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
  },
});

export const { saveFavoriteFood, saveFavoriteFoodOK, saveFavoriteFoodError } =
  saveFavoriteFoodSlice.actions;

export const favoriteFoodsReducer = combineReducers({
  list: favoriteFoodsListSlice.reducer,
  save: saveFavoriteFoodSlice.reducer,
});
