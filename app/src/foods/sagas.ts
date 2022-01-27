import { takeEvery, call, put } from "redux-saga/effects";
import { fetchAllFoods } from "./api";
import {
  getAllFoods,
  getAllFoodsError,
  getAllFoodsOK,
  GetAllFoodsOkAction,
} from "./state";
import type {
  GetAllFoodsAPIResponse,
  GetAllFoodsAPIResponseError,
} from "./types";

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
    yield put(getAllFoodsError(error as GetAllFoodsAPIResponseError));
  }
}

export function* foodsWatcher() {
  yield takeEvery(getAllFoods.type, getAllFoodsSaga);
}
