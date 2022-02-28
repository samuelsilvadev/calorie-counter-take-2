import { add, remove } from "notifications/state";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import type { SaveError, SaveErrorFE } from "shared/types/api";
import { ENDPOINTS } from "shared/utils/api";
import { saveFood } from "./api";
import {
  saveFood as saveFoodAction,
  saveFoodOK,
  saveFoodError,
  SaveFoodAction,
  SaveFoodErrorAction,
  SaveFoodOkAction,
} from "./state";
import type { SaveFoodAPIResponse } from "./types";

function* saveFoodSaga(action: SaveFoodAction) {
  const { food } = action.payload;

  try {
    const response: SaveFoodAPIResponse = yield call(saveFood, food);

    if (!("data" in response)) {
      throw response;
    }

    yield put(saveFoodOK({ food: response.data }));
  } catch (error) {
    const safeError: SaveError = error as any;
    const enhancedError: SaveErrorFE = {
      ...safeError,
      status: true,
      resource: ENDPOINTS.FOODS,
    };

    yield put(saveFoodError({ error: enhancedError }));
  }
}

function* saveFoodOkNotificationSaga(action: SaveFoodOkAction) {
  const {
    food: { id },
  } = action.payload;

  yield put(
    add({
      notification: {
        id,
        type: "success",
        message: "Food successfully created",
      },
    })
  );
  yield delay(3000);
  yield put(remove({ id }));
}

function* saveFoodErrorNotificationSaga(action: SaveFoodErrorAction) {
  const {
    error: { message, responseTimestamp },
  } = action.payload;

  yield put(
    add({
      notification: {
        id: responseTimestamp,
        type: "error",
        message,
      },
    })
  );
  yield delay(3000);
  yield put(remove({ id: responseTimestamp }));
}

export function* saveFoodWatcher() {
  yield takeEvery(saveFoodAction.type, saveFoodSaga);
  yield takeEvery(saveFoodOK.type, saveFoodOkNotificationSaga);
  yield takeEvery(saveFoodError.type, saveFoodErrorNotificationSaga);
}
