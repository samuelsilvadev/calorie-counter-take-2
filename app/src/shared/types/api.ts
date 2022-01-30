export type GetAllCommon = {
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
};

export type GetAllError = {
  message: string;
  name: string;
} & GetAllCommon;
