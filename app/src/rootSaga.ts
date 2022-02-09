import { all } from "redux-saga/effects";
import { foodsWatcher } from "foods/sagas";
import { foodDetailsWatcher } from "food-details/sagas";

export function* rootSaga() {
  yield all([foodsWatcher(), foodDetailsWatcher()]);
}
