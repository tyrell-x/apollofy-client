import React, { useState } from "react";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-icon-container">
      <a href="#" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </div>
  );
}

export default NavItem;
