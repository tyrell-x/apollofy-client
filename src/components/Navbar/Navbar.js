import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { SidebarData } from "./SidebarData";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.scss";
import { signOut } from "../../redux/auth/auth-actions";

import { Link } from "react-router-dom";

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
function DropdownMenu() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  function DropdownItem(props) {
    return (
      <Link to={props.path} onClick={props.onClick} className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </Link>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem leftIcon={<CgProfile />} path={"/account"}>
        Account
      </DropdownItem>
      <DropdownItem
        leftIcon={<FaSignOutAlt />}
        path={"#"}
        onClick={handleSignOut}
      >
        Sign Out
      </DropdownItem>
    </div>
  );
}
function Navbar({ title }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="main-navbar">
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>

        <h1>{title}</h1>

        <NavItem icon={<FiSettings className="dropdown-icon" />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="navText">
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
