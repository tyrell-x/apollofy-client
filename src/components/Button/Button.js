import React from "react";

import "./Button.scss";

function Button(props) {
  const { text, ...attributes } = props;

  return (
    <button {...attributes} className="button">
        <span className="button__text">{text}</span>
        {props.children}
    </button>
  );
}

export default Button;
