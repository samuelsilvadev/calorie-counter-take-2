import { call, put, select, takeEvery } from "redux-saga/effects";
import { RootState } from "store";
import { fetchFood } from "./api";
import {
  getFood,
  getFoodOk,
  GetFoodAction,
  GetFoodOkAction,
  FoodDetailsItemState,
} from "./state";
import type { GetFoodAPIResponseOk } from "./types";

function* getFoodSaga(action: GetFoodAction) {
  const { id } = action.payload;

  const cachedFood: FoodDetailsItemState = yield select(
    (state: RootState) => state.food[id]
  );

  if (!cachedFood.loading && !cachedFood.error && cachedFood.food) {
    return;
  }

  try {
    const response: GetFoodAPIResponseOk = yield call(fetchFood, id);
    const payload: GetFoodOkAction["payload"] = {
      food: response.data,
      id,
    };
    yield put(getFoodOk(payload));
  } catch (error) {
    //   TODO: handle error
  }
}

export function* foodDetailsWatcher() {
  yield takeEvery(getFood.type, getFoodSaga);
}
