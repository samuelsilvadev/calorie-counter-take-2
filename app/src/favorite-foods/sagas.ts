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
  removeFavoriteFood,
  RemoveFavoriteFoodsAction,
  removeFavoriteFoodOK,
} from "./state";
import {
  getFavoriteFoodsByUser,
  postFavoriteFood,
  deleteFavoriteFood,
} from "./api";
import { RootState } from "store";
import {
  FavoriteFood,
  GetAllFavoritesAPIResponse,
  RemoveFavoriteFoodAPIResponse,
  RemoveFavoriteFoodAPIResponseError,
  SaveFavoriteFoodAPIResponse,
  SaveFavoriteFoodAPIResponseError,
} from "./types";
import { ENDPOINTS } from "shared/utils/api";
import type { GetAllError, RemoveErrorFE, SaveErrorFE } from "shared/types/api";
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

    yield put(getAllFavoriteFoodsOK({ foods: response.data }));
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

    yield put(saveFavoriteFoodOK({ favoriteFood: response.data }));
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
  const { favoriteFood } = action.payload;

  yield put(
    add({
      notification: {
        id: favoriteFood.food,
        message: "Selected food was added to the favorites list",
        type: "success",
      },
    })
  );
  yield delay(3000);
  yield put(remove({ id: favoriteFood.food }));
}

function* removeFavoriteFoodsSaga(action: RemoveFavoriteFoodsAction) {
  const { foodId } = action.payload;

  const synchronizedFavorites: Record<string, FavoriteFood> = yield select(
    (state: RootState) => state.favoriteFoods.synchronizedFavorites
  );
  const favoriteFood = synchronizedFavorites[foodId];

  try {
    const response: RemoveFavoriteFoodAPIResponse = yield call(
      deleteFavoriteFood,
      favoriteFood.id
    );

    if ("errors" in response) {
      throw response;
    }

    yield put(removeFavoriteFoodOK({ favoriteFood }));
  } catch (error) {
    const safeError: RemoveFavoriteFoodAPIResponseError = error as any;
    const enhancedError: RemoveErrorFE = {
      ...safeError,
      status: true,
      resource: ENDPOINTS.FAVORITE_FOODS,
    };

    yield put(saveFavoriteFoodError({ foodId, error: enhancedError }));
  }
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
  yield takeEvery(removeFavoriteFood.type, removeFavoriteFoodsSaga);
}
