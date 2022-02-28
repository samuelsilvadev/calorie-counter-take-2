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

export type SaveError = {
  error: boolean;
  responseTimestamp: string;
  name: string;
  message: string;
  statusCode: number;
  /**
   * { fieldName: errorMessage }
   */
  errors: Record<string, string>;
};

export type GetAllErrorFE = {
  /**
   * Describe which endpoint failed
   */
  resource: string;
} & GetAllError;

export type SaveErrorFE = GetAllErrorFE;
export type RemoveErrorFE = GetAllErrorFE;
