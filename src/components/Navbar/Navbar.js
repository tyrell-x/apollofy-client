import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import NavItem from "../NavItem";
import DropdownMenu from "../DropdownMenu";

function Navbar({ title = "" }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <header className="main-navbar">
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
    </header>
  );
}

export default Navbar;
