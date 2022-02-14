import { add } from "notifications/state";
import { call, put, takeEvery } from "redux-saga/effects";
import type { GetAllErrorFE } from "shared/types/api";
import { ENDPOINTS } from "shared/utils/api";
import { identityError } from "shared/utils/error";
import { fetchUser } from "./api";
import {
  getUser as getUserAction,
  getUserError,
  GetUserErrorAction,
  getUserOk,
  GetUserOkAction,
} from "./state";
import type { GetAllUsersByEmailAPIResponse } from "./types";

function buildEmptyUserError() {
  const emptyUserError: GetAllErrorFE = {
    error: true,
    message: "User email cannot be empty",
    name: "EmptyEmail",
    status: true,
    statusCode: 400,
    resource: "client",
    responseTimestamp: Date.now().toString(),
  };

  return emptyUserError;
}

function buildNoUserFoundError() {
  const noUserFoundError: GetAllErrorFE = {
    error: true,
    message: "User is not existent",
    name: "UserNotFound",
    status: true,
    statusCode: 404,
    resource: ENDPOINTS.USERS,
    responseTimestamp: Date.now().toString(),
  };

  return noUserFoundError;
}

export function* getUser() {
  yield put(getUserAction());

  try {
    const userEmail = process.env.REACT_APP_DEFAULT_USER_EMAIL;

    if (!userEmail) {
      throw buildEmptyUserError();
    }

    const response: GetAllUsersByEmailAPIResponse = yield call(
      fetchUser,
      userEmail
    );

    if (!("data" in response)) {
      throw response;
    }

    if (response.data.length === 0) {
      throw buildNoUserFoundError();
    }

    const payload: GetUserOkAction["payload"] = {
      user: response.data[0],
    };

    yield put(getUserOk(payload));
  } catch (error) {
    const safeError: GetAllErrorFE | Error = error as any;
    const enhancedError =
      safeError instanceof Error
        ? identityError(safeError, ENDPOINTS.USERS)
        : safeError;

    yield put(getUserError(enhancedError));
  }
}

function* includeErrorNotification(action: GetUserErrorAction) {
  yield put(
    add({
      notification: {
        id: Date.now().toString(),
        message: action.payload.message,
        type: "error",
      },
    })
  );
}

export function* userNotificationsWatcher() {
  yield takeEvery(getUserError.type, includeErrorNotification);
}
