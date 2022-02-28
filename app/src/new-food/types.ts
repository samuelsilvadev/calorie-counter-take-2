import type { Food } from "foods/types";
import type { SaveError } from "shared/types/api";

export type SaveFoodAPIResponseOk = {
  error: false;
  responseTimestamp: string;
  status: true;
  statusCode: number;
  data: Food;
};

export type SaveFoodAPIResponseError = SaveError;

export type SaveFoodAPIResponse =
  | SaveFoodAPIResponseOk
  | SaveFoodAPIResponseError;

export type CreateFood = Omit<Food, "id" | "createdBy" | "updatedBy">;
