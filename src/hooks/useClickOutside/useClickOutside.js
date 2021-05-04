import { useRef, useEffect } from "react";

const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mouseup", maybeHandler);
    return () => {
      document.removeEventListener("mouseup", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

export default useClickOutside;
