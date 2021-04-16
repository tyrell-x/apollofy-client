import React from "react";
import { useState } from "react";

import "./FLInput.scss";

function FLInput(props) {
  const { label, ...attributes } = props;

  const [active, setActive] = useState(false);

  const activate = () => {
    setActive(true);
  };

  const tryDesactivate = event => {
    !event.target.value ? setActive(false) : setActive(true);
  };

  return (
    <div className={`floating-label-input ${active ? "active" : ""}`}>
      <label>
        <input {...attributes} onFocus={activate} onBlur={tryDesactivate} onInput={tryDesactivate}></input>
        <span className="input-placeholder">
          {label + (attributes.required ? "*" : "")}
        </span>
      </label>
    </div>
  );
}

export default FLInput;
