import { useState, useEffect, useCallback, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import "./FLSelect.scss";

export default forwardRef((props, ref) => {
  const {
    label,
    register = () => {},
    name,
    rules,
    error,
    borderMode = "all",
    ...attributes
  } = props;

  const [hasError, setHasError] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (error) {
      setHasError(true);
      const timerRef = setTimeout(() => setHasError(false), 4000);
      return () => clearTimeout(timerRef);
    }
    setHasError(false);
  }, [error]);

  const activate = () => {
    setActive(true);
  };

  return (
    <div className="select-container">
      <div
        className={`floating-label-input ${active ? "active" : null} ${
          hasError ? "error" : null
        } border-${borderMode}`}
      >
        <label>
          <span className="input-placeholder">
            {label + (attributes.required || rules?.required ? "*" : "")}
          </span>
          <select
            ref={ref}
            {...attributes}
            {...register(name, rules)}
            name={name}
            onInput={activate}
          >
            <option hidden disabled selected value=""></option>
            <option>Opcion 1</option>
            <option>Opcion 2</option>
          </select>
        </label>
      </div>
      {hasError && error?.type === "required" && (
        <span className="error-message" role="alert">
          Required field
        </span>
      )}
      {hasError && error?.type !== "required" && (
        <span className="error-message" role="alert">
          {error?.message}
        </span>
      )}
    </div>
  );
});
