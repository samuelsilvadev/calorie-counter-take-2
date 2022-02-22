import { bindActionCreators } from "@reduxjs/toolkit";
import {
  saveFavoriteFood as saveFavoriteFoodAction,
  removeFavoriteFood as removeFavoriteFoodAction,
} from "./state";
import { useMemo } from "react";
import { useSafeDispatch, useSafeSelector } from "store";

export function useFavoriteFoods() {
  const dispatch = useSafeDispatch();
  const favorites = useSafeSelector((state) => state.favoriteFoods.favorites);
  const synchronizedFavorites = useSafeSelector(
    (state) => state.favoriteFoods.synchronizedFavorites
  );

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          saveFavoriteFood(foodId: string) {
            return saveFavoriteFoodAction({ foodId });
          },
          removeFavoriteFood(foodId: string) {
            return removeFavoriteFoodAction({ foodId });
          },
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    synchronizedFavorites,
    favorites,
    actions,
  };
}
