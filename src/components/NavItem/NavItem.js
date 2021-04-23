import React, { useState } from "react";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-icon-container">
      <button href="#" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>
      {open && props.children}
    </div>
  );
}

export default NavItem;
