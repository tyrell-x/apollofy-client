import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  const modalRef = useClickOutside(() => {
    setOpen(false);
  });

  return (
    <div ref={modalRef} className="dropdown-icon-container">
      <button href="#" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>
      {open && props.children}
    </div>
  );
}

export default NavItem;
