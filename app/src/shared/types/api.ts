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

export type GetAllErrorFE = {
  /**
   * Describe which endpoint failed
   */
  resource: string;
} & GetAllError;

export type SaveErrorFE = GetAllErrorFE;
