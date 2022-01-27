import { all } from "redux-saga/effects";
import { foodsWatcher } from "foods/sagas";

export function* rootSaga() {
  yield all([foodsWatcher()]);
}
