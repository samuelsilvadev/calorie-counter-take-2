import { bindActionCreators } from "@reduxjs/toolkit";
import { saveFavoriteFood as saveFavoriteFoodAction } from "./state";
import { useMemo } from "react";
import { useSafeDispatch, useSafeSelector } from "store";

export function useFavoriteFoods() {
  const dispatch = useSafeDispatch();
  const favorites = useSafeSelector((state) => state.favoriteFoods.favorites);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          saveFavoriteFood(foodId: string) {
            return saveFavoriteFoodAction({ foodId });
          },
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    favorites,
    actions,
  };
}
