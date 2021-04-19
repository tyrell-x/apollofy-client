import React, { useRef } from "react";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import "./FLInput.scss";

function FLInput(props) {
  const {
    label,
    register = () => {},
    name,
    rules,
    error,
    ...attributes
  } = props;

  const [hasError, setHasError] = useState(false);
  const [active, setActive] = useState(false);
  const [type, setType] = useState(attributes?.type || "text");

  const input = useRef();

  useEffect(() => {
    if (error) {
      setHasError(true);
      const timerRef = setTimeout(() => setHasError(false), 4000);
      return () => clearTimeout(timerRef);
    } else {
      setHasError(false);
    }
  }, [error]);

  const changeVisibility = useCallback(() => {
    setType((type) => (type === "password" ? "text" : "password"));
  }, []);

  const activate = () => {
    setActive(true);
  };

  const tryDesactivate = (event) => {
    !event.target.value ? setActive(false) : setActive(true);
  };

  return (
    <div className="input-container">
      <div
        className={`floating-label-input ${active ? "active" : null} ${
          hasError ? "error" : null
        }`}
      >
        <label>
          <input
            {...attributes}
            {...register(name, rules)}
            name={name}
            onFocus={activate}
            onBlur={tryDesactivate}
            onInput={tryDesactivate}
            type={type}
          ></input>
          <span className="input-placeholder">
            {label + (attributes.required || rules?.required ? "*" : "")}
          </span>
          {attributes?.type === "password" && active && (
            <div className="password-eye" onClick={changeVisibility}>
              <button type="button">
                <FontAwesomeIcon
                  className="far"
                  icon={type === "password" ? faEye : faEyeSlash}
                />
              </button>
            </div>
          )}
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
}

export default FLInput;
