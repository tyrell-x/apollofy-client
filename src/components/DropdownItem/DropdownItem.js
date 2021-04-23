import React from "react";
import { Link } from "react-router-dom";

function DropdownItem(props) {
  return (
    <Link to={props.path} onClick={props.onClick} className="menu-item">
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
    </Link>
  );
}

export default DropdownItem;
