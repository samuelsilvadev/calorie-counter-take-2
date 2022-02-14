import { takeEvery, call, put } from "redux-saga/effects";
import { GetAllError } from "shared/types/api";
import { ENDPOINTS } from "shared/utils/api";
import { identityError } from "shared/utils/error";
import { fetchAllFoods } from "./api";
import {
  getAllFoods,
  getAllFoodsError,
  getAllFoodsOK,
  GetAllFoodsOkAction,
} from "./state";
import type { GetAllFoodsAPIResponse } from "./types";

function* getAllFoodsSaga() {
  try {
    const response: GetAllFoodsAPIResponse = yield call(fetchAllFoods);

    if (!("data" in response)) {
      throw response;
    }

    const payload: GetAllFoodsOkAction["payload"] = {
      foods: response.data,
    };
    yield put(getAllFoodsOK(payload));
  } catch (error) {
    const composedError: GetAllError | Error = error as any;
    const finalError: GetAllError =
      composedError instanceof Error
        ? identityError(composedError, ENDPOINTS.FOODS)
        : composedError;

    yield put(getAllFoodsError(finalError));
  }
}

export function* foodsWatcher() {
  yield takeEvery(getAllFoods.type, getAllFoodsSaga);
}
