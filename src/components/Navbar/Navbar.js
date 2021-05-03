import React, { useState, useRef } from "react";
import * as AiIcons from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import NavItem from "../NavItem";
import DropdownMenu from "../DropdownMenu";
import useClickOutside from "../../hooks/useClickOutside";
import FLInput from "../FLInput";
import * as ROUTES from "../../routes";
import { useLocation } from "react-router-dom";

function Navbar({ title = "" }) {
  const location = useLocation();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const menuRef = useClickOutside(() => {
    setSidebar(false);
  });

  return (
    <header className="main-navbar">
      <div className="navbar">
        <div className="logo">APOLLOFY</div>
        <div className="nav-items">
          <Link
            to={ROUTES.HOME}
            className={
              location.pathname === ROUTES.HOME ? "active" : ""
            }
          >
            <div className="nav-item">
              <i>
                <AiIcons.AiFillHome />
              </i>
              <span>Home</span>
            </div>
          </Link>

          <Link
            to={ROUTES.LIBRARY}
            className={
              location.pathname.startsWith(ROUTES.LIBRARY) ? "active" : ""
            }
          >
            <div className="nav-item">
              <i>
                <AiIcons.AiFillBook />
              </i>
              <span>My Library</span>
            </div>
          </Link>
          <Link
            to={ROUTES.EXPLORE}
            className={
              location.pathname.startsWith(ROUTES.EXPLORE) ? "active" : ""
            }
          >
            <div className="nav-item">
              <i>
                <AiIcons.AiOutlineSearch />
              </i>
              <span>Explore</span>
            </div>
          </Link>
        </div>

        <FLInput borderMode="bottom" className="finder" label="Search">
          <i className="search-icon">
            <AiIcons.AiOutlineSearch />
          </i>
        </FLInput>
        <div className="account-button">
          <i>
            <AiIcons.AiOutlineUser />
          </i>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <h1>{title}</h1>
        <NavItem icon={<FiSettings className="dropdown-icon" />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
        <ul ref={menuRef} className="nav-menu-items" onClick={showSidebar}>
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
