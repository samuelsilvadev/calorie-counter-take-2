import { useCallback } from "react";
import { useSafeDispatch, useSafeSelector } from "store";
import { saveFood as saveFoodAction } from "./state";
import type { CreateFood } from "./types";

export function useNewFood() {
  const dispatch = useSafeDispatch();
  const loading = useSafeSelector((state) => state.saveFood.loading);
  const error = useSafeSelector((state) => state.saveFood.error);

  return {
    loading,
    error,
    actions: {
      saveFood: useCallback(
        (food: CreateFood) => {
          dispatch(saveFoodAction({ food }));
        },
        [dispatch]
      ),
    },
  };
}
