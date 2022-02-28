import type { GetAllCommon, GetAllError, SaveError } from "shared/types/api";

export type FavoriteFood = {
  id: string;
  createdAt: string;
  updatedAt: string;
  food: string;
  user: string;
};

export type GetAllFavoritesAPIResponseError = GetAllError;

export type GetAllFavoritesAPIResponseOK = {
  data: FavoriteFood[];
  totalCount: number;
} & GetAllCommon;

export type GetAllFavoritesAPIResponse =
  | GetAllFavoritesAPIResponseOK
  | GetAllFavoritesAPIResponseError;

export type SaveFavoriteFoodAPIResponseOk = {
  data: FavoriteFood;
};

export type SaveFavoriteFoodAPIResponseError = SaveError;

export type SaveFavoriteFoodAPIResponse =
  | SaveFavoriteFoodAPIResponseOk
  | SaveFavoriteFoodAPIResponseError;

export type RemoveFavoriteFoodAPIResponseOk = {
  data: FavoriteFood;
};

export type RemoveFavoriteFoodAPIResponseError = SaveError;

export type RemoveFavoriteFoodAPIResponse =
  | RemoveFavoriteFoodAPIResponseOk
  | RemoveFavoriteFoodAPIResponseError;
