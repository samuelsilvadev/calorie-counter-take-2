import type { GetAllCommon, GetAllError } from "shared/types/api";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type GetAllUsersByEmailAPIResponseOk = {
  data: User[];
  totalCount: number;
} & GetAllCommon;

export type GetAllUsersByEmailAPIResponse =
  | GetAllUsersByEmailAPIResponseOk
  | GetAllError;
