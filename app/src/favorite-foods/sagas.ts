import { call, put, select, takeEvery } from "redux-saga/effects";
import { add } from "notifications/state";
import {
  saveFavoriteFood,
  saveFavoriteFoodError,
  saveFavoriteFoodOK,
  SaveFavoriteFoodsAction,
  SaveFavoriteFoodsErrorAction,
  SaveFavoriteFoodsOkAction,
} from "./state";
import { postFavoriteFood } from "./api";
import { RootState } from "store";
import {
  SaveFavoriteFoodAPIResponse,
  SaveFavoriteFoodAPIResponseError,
} from "./types";
import { ENDPOINTS } from "shared/utils/api";
import type { SaveErrorFE } from "shared/types/api";

function* saveFavoriteFoodsSaga(action: SaveFavoriteFoodsAction) {
  const { foodId } = action.payload;
  const userId: string | undefined = yield select(
    (state: RootState) => state.user.user?.id
  );

  if (!userId) {
    return;
  }

  try {
    const response: SaveFavoriteFoodAPIResponse = yield call(
      postFavoriteFood,
      foodId,
      userId
    );

    if ("errors" in response) {
      throw response;
    }

    yield put(saveFavoriteFoodOK({ foodId }));
  } catch (error) {
    const safeError: SaveFavoriteFoodAPIResponseError = error as any;
    const enhancedError: SaveErrorFE = {
      ...safeError,
      status: true,
      resource: ENDPOINTS.FAVORITE_FOODS,
    };

    yield put(saveFavoriteFoodError({ foodId, error: enhancedError }));
  }
}

function* includeSuccessNotification(action: SaveFavoriteFoodsOkAction) {
  const { foodId } = action.payload;

  yield put(
    add({
      notification: {
        id: foodId,
        message: `Selected food was added to the favorites list`,
        type: "success",
      },
    })
  );
}

function* includeErrorNotification(action: SaveFavoriteFoodsErrorAction) {
  const { foodId, error } = action.payload;

  yield put(
    add({
      notification: {
        id: foodId,
        message: error.message,
        type: "error",
      },
    })
  );
}

export function* saveFavoriteFoodWatcher() {
  yield takeEvery(saveFavoriteFood.type, saveFavoriteFoodsSaga);
  yield takeEvery(saveFavoriteFoodOK.type, includeSuccessNotification);
  yield takeEvery(saveFavoriteFoodError, includeErrorNotification);
}
