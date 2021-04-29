import "./Dropdown.scss";

import * as BsIcons from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside/index.js";

function Dropdown(props) {
  const { isOpen, setIsOpen, children } = props;

  const ref = useClickOutside(() => setIsOpen(false));

  const toggleOpened = () => {
    setIsOpen((opened) => !opened);
  };

  return (
    <>
      <button href="#" onClick={toggleOpened}>
        <BsIcons.BsThreeDotsVertical />
      </button>
      <div
        ref={ref}
        style={{
          display: isOpen ? "block" : "none",
        }}
        className="dropdown-card"
      >
        <div className="dropdown-content">
          {children.map((child, index) => (
            <div key={index} className="dropdown-item">
              {child}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dropdown;
