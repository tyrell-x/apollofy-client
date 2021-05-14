import React, { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

function NavItem(props) {
  const [open, setOpen] = useState(false);

  const modalRef = useClickOutside(() => {
    setOpen(false);
  });

  return (
    <div ref={modalRef} className="dropdown-icon-container">
      <div href="#" onClick={() => setOpen(!open)}>
        {props.icon}
      </div>
      {open && props.children}
    </div>
  );
}

export default NavItem;
