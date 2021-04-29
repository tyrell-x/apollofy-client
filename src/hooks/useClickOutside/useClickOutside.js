import { useRef, useEffect } from "react";

const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    console.log("prueba");
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, []);

  return domNode;
};

export default useClickOutside;
