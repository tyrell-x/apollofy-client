import React from "react";
import { useState } from "react";

import "./FLInput.scss";

function FLInput(props) {
  const { label, ...attributes } = props;

  const [active, setActive] = useState(false);

  const activate = (event) => {
    setActive(true);
  };

  const desactive = (event) => {
    if (!event.target.value) {
      setActive(false);
    }
  };

  return (
    <div className={`floating-label-input ${active ? "active" : ""}`}>
      <label>
        <input {...attributes} onFocus={activate} onBlur={desactive}></input>
        <span className="input-placeholder">
          {label + (attributes.required ? "*" : "")}
        </span>
      </label>
    </div>
  );
}

export default FLInput;
