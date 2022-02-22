export type SaveFavoriteFoodAPIResponseOk = {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    food: string;
    user: string;
  };
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
