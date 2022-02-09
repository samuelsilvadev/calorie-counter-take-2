import type { Food } from "foods/types";

export type GetFoodAPIResponseOk = {
  data: Food;
};

export type GetAllFoodsAPIResponse = GetFoodAPIResponseOk;
