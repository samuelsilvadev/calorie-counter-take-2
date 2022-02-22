import type { GetAllCommon, GetAllError } from "shared/types/api";

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

export type SaveFavoriteFoodAPIResponseError = {
  error: boolean;
  responseTimestamp: string;
  name: string;
  message: string;
  statusCode: number;
  errors: Record<string, string>;
};

export type SaveFavoriteFoodAPIResponse =
  | SaveFavoriteFoodAPIResponseOk
  | SaveFavoriteFoodAPIResponseError;
