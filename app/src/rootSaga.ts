import { all, call } from "redux-saga/effects";
import { foodsWatcher } from "foods/sagas";
import { foodDetailsWatcher } from "food-details/sagas";
import { getUser, userNotificationsWatcher } from "user/sagas";
import { saveFavoriteFoodWatcher } from "favorite-foods/sagas";
import { saveFoodWatcher } from "new-food/sagas";

export function* rootSaga() {
  yield all([
    call(getUser),
    foodsWatcher(),
    foodDetailsWatcher(),
    userNotificationsWatcher(),
    saveFavoriteFoodWatcher(),
    saveFoodWatcher(),
  ]);
}
