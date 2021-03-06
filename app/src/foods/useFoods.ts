import { useCallback } from "react";
import { useSafeDispatch, useSafeSelector } from "store";
import { getAllFoods } from "./state";

export function useFoods() {
  const dispatch = useSafeDispatch();
  const foods = useSafeSelector((state) => state.foods.foods);
  const loading = useSafeSelector((state) => state.foods.loading);
  const error = useSafeSelector((state) => state.foods.error);

  return {
    error,
    loading,
    foods,
    actions: {
      getAllFoods: useCallback(() => dispatch(getAllFoods()), [dispatch]),
    },
  };
}
