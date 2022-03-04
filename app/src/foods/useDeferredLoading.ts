import { useEffect, useState } from "react";

type UseDeferredLoadingOptions = {
  initialLoading: boolean;
  loading: boolean;
  /**
   * @default 400ms
   */
  delay?: number;
};

export function useDeferredLoading({
  initialLoading,
  loading,
  delay = 400,
}: UseDeferredLoadingOptions) {
  const [deferredLoading, setDeferredLoading] = useState(initialLoading);

  useEffect(() => {
    if (loading) {
      setDeferredLoading(true);
    } else {
      const timerId = window.setTimeout(() => {
        setDeferredLoading(false);
      }, delay);

      return () => {
        window.clearTimeout(timerId);
      };
    }
  }, [loading, delay]);

  return deferredLoading;
}
