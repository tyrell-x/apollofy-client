import "./DropdownPlaylistOptions.scss";

import * as BsIcons from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside/index.js";

function DropdownPlaylistOptions(props) {
  const { isOpen, setIsOpen, children } = props;

  const ref = useClickOutside(() => setIsOpen(false));

  const toggleOpened = () => {
    setIsOpen((opened) => !opened);
  };

  return (
    <>
      <div href="#" onClick={toggleOpened} className="options-button">
        <BsIcons.BsThreeDotsVertical />
      </div>
      <div
        ref={ref}
        style={{
          display: isOpen ? "block" : "none",
        }}
        className="dropdownPlaylistOptions-card"
      >
        <div className="dropdownPlaylistOptions-content">
          {children.map((child, index) => (
            <button key={index} className="dropdownPlaylistOptions-item">
              {child}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default DropdownPlaylistOptions;
