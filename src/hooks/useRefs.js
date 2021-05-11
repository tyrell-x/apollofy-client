import { useCallback, useRef } from "react";

export function useRefs() {
  const refs = useRef({});

  const register = useCallback(
    (refName) => (ref) => {
      refs.current = {
        ...refs.current,
        [refName]: ref,
      };
    },
    [refs],
  );

  const resetRefs = useCallback(() => {
    refs.current = {};
  }, []);

  return [refs.current, register, resetRefs];
}
