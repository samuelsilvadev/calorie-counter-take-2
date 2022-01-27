type GetAllFoodsAPIResponseCommon = {
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
};

export type GetAllFoodsAPIResponseOk = {
  data: Food[];
  totalCount: number;
} & GetAllFoodsAPIResponseCommon;

export type GetAllFoodsAPIResponseError = {
  message: string;
  name: string;
} & GetAllFoodsAPIResponseCommon;

export type GetAllFoodsAPIResponse =
  | GetAllFoodsAPIResponseOk
  | GetAllFoodsAPIResponseError;

export type Food = {
  id: string;
  createdBy: string;
  updatedBy: string;
  saturatedFats: number;
  calories: number;
  alcohol: number;
  addedSugars: number;
  solidFats: number;
  oils: number;
  dryBeansPeas: number;
  soy: number;
  meats: number;
  milk: number;
  fruits: number;
  otherVegetables: number;
  starchyVegetables: number;
  darkGreenVegetables: number;
  orangeVegetables: number;
  vegetables: number;
  wholeGrains: number;
  grains: number;
  multiplier: number;
  increment: number;
  factor: number;
  portionDisplayName: string;
  portionAmount: number;
  portion: number;
  name: string;
};
