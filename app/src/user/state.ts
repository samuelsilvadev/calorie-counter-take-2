import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GetAllError } from "shared/types/api";
import type { User } from "user/types";

type UserState = {
  loading: boolean;
  user: User | null;
  error: GetAllError | null;
};

export type GetUserOkAction = PayloadAction<{ user: User }>;
export type GetUserErrorAction = PayloadAction<GetAllError>;

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state: UserState) => {
      state.loading = true;
      state.user = null;
    },
    getUserOk: (state: UserState, action: GetUserOkAction) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    getUserError: (state: UserState, action: GetUserErrorAction) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUser, getUserOk, getUserError } = userSlice.actions;

export const userReducer = userSlice.reducer;
