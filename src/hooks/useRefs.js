import { useCallback, useRef } from "react";

export function useRefs() {
    const refs = useRef({});
  
    const register = useCallback((refName) => ref => {
      refs.current[refName] = ref;
    }, []);

    const resetRefs = useCallback(() => {
        refs.current = {};
    })
  
    return [refs, register, resetRefs];
}