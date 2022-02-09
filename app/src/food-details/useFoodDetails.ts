import { useCallback } from "react";
import { RootState, useSafeDispatch, useSafeSelector } from "store";
import { getFood } from "./state";

function getFoodById(state: RootState, id?: string) {
  return id ? state.food[id] : null;
}

export function useFoodDetails(id?: string) {
  const dispatch = useSafeDispatch();
  const food = useSafeSelector((state) => getFoodById(state, id)?.food ?? null);
  const loading = useSafeSelector((state) => !!getFoodById(state, id)?.loading);
  const error = useSafeSelector((state) => getFoodById(state, id)?.error);

  return {
    food,
    loading,
    error,
    actions: {
      getFood: useCallback(
        (id: string) => dispatch(getFood({ id })),
        [dispatch]
      ),
    },
  };
}
