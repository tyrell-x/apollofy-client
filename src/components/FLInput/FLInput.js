import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import "./FLInput.scss";

const FLInput = (props) => {
  const {
    label,
    register = () => {},
    name,
    rules,
    error,
    className = "",
    borderMode = "all",
    disabled = false,
    containerAttributes = {},
    children,
    ...attributes
  } = props;

  const [hasError, setHasError] = useState(false);
  const [active, setActive] = useState(false);
  const [type, setType] = useState(attributes?.type || "text");

  useEffect(() => {
    if (error) {
      setHasError(true);
      const timerRef = setTimeout(() => setHasError(false), 4000);
      return () => clearTimeout(timerRef);
    }
    setHasError(false);
  }, [error]);

  useEffect(() => {
    setActive(!!attributes.value);
  }, [attributes.value]);

  const changePasswordVisibility = useCallback(() => {
    setType((type) => (type === "password" ? "text" : "password"));
  }, []);

  const activate = () => {
    setActive(true);
  };

  const tryDesactivate = (event) => {
    setActive(!!event.target.value);
  };

  return (
    <div
      {...containerAttributes}
      className={`input-container ${className ? " " + className : ""}`}
    >
      <div
        className={`floating-label-input ${active ? "active" : ""} ${
          disabled ? "disabled" : ""
        } ${hasError ? "error" : ""} border-${borderMode}
        ${className ? " " + className : ""}`}
      >
        <label>
          <input
            {...register(name, rules)}
            name={name}
            onFocus={activate}
            onBlur={tryDesactivate}
            onInput={tryDesactivate}
            disabled={disabled}
            type={type}
            {...attributes}
          ></input>
          <span className="input-placeholder">
            {label + (attributes.required || rules?.required ? "*" : "")}
          </span>
          {children}
          {attributes?.type === "password" && active && (
            <div className="password-eye" onClick={changePasswordVisibility}>
              <button type="button">
                <FontAwesomeIcon
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
};

export default FLInput;
