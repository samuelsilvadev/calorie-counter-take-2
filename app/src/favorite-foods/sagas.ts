import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { add, remove } from "notifications/state";
import {
  saveFavoriteFood,
  saveFavoriteFoodError,
  saveFavoriteFoodOK,
  SaveFavoriteFoodsAction,
  SaveFavoriteFoodsErrorAction,
  SaveFavoriteFoodsOkAction,
  getAllFavoriteFoodsOK,
  getAllFavoriteFoodsError,
} from "./state";
import { getFavoriteFoodsByUser, postFavoriteFood } from "./api";
import { RootState } from "store";
import {
  GetAllFavoritesAPIResponse,
  SaveFavoriteFoodAPIResponse,
  SaveFavoriteFoodAPIResponseError,
} from "./types";
import { ENDPOINTS } from "shared/utils/api";
import type { GetAllError, SaveErrorFE } from "shared/types/api";
import { getUserOk, GetUserOkAction } from "user/state";

function* getFavoriteFoodsByUserSaga(action: GetUserOkAction) {
  try {
    const response: GetAllFavoritesAPIResponse = yield call(
      getFavoriteFoodsByUser,
      action.payload.user.id
    );

    if (!("data" in response)) {
      throw response;
    }

    yield put(getAllFavoriteFoodsOK({ foodIds: response.data }));
  } catch (error) {
    const safeError: GetAllError = error as any;
    const enhancedError: SaveErrorFE = {
      ...safeError,
      status: true,
      resource: ENDPOINTS.FAVORITE_FOODS,
    };

    yield put(getAllFavoriteFoodsError({ error: enhancedError }));
  }
}

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
  yield delay(3000);
  yield put(remove({ id: foodId }));
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
  yield delay(3000);
  yield put(remove({ id: foodId }));
}

export function* saveFavoriteFoodWatcher() {
  yield takeEvery(getUserOk.type, getFavoriteFoodsByUserSaga);
  yield takeEvery(saveFavoriteFood.type, saveFavoriteFoodsSaga);
  yield takeEvery(saveFavoriteFoodOK.type, includeSuccessNotification);
  yield takeEvery(saveFavoriteFoodError, includeErrorNotification);
}
