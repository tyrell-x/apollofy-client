import React, { useState, useRef } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import NavItem from "../NavItem";
import DropdownMenu from "../DropdownMenu";
import useClickOutside from "../../hooks/useClickOutside";
import * as ROUTES from "../../routes";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import FLInput from "../FLInput/index.js";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();

  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const menuRef = useClickOutside(() => {
    setSidebar(false);
  });

  const finderTimeoutRef = useRef(null);

  const applyNameFilter = (e) => {
    setSearchValue(e.target.value)
    if (!e.target.value) {
      clearTimeout(finderTimeoutRef.current);
      finderTimeoutRef.current = null;
      return;
    }

    if (finderTimeoutRef.current) {
      clearTimeout(finderTimeoutRef.current);
      finderTimeoutRef.current = setTimeout(() => {
        history.push(`/search/${e.target.value}`);
        setSearchValue("")
      }, 500);
    } else {
      finderTimeoutRef.current = setTimeout(() => {
        history.push(`/search/${e.target.value}`);
        setSearchValue("")
      }, 500);
    }
  };

  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <header className="main-navbar">
      <div
        className={`navbar ${
          (location.pathname.startsWith(ROUTES.PLAYLIST) || location.pathname.startsWith(ROUTES.PROFILE) )  ? "playlist" : "" 
        }`}
      >
        <div id="menu-button">
          <button to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </button>
        </div>
        <div className="logo">APOLLOFY</div>
        <div className="nav-items">
          <Link
            to={ROUTES.HOME}
            className={location.pathname === ROUTES.HOME ? "active" : ""}
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
            to={ROUTES.UPLOAD_SONG}
            className={
              location.pathname.startsWith(ROUTES.UPLOAD_SONG) ? "active" : ""
            }
          >
            <div className="nav-item">
              <i>
                <AiIcons.AiOutlineUpload />
              </i>
              <span>Upload</span>
            </div>
          </Link>
        </div>
        <div className="finder">
          <FLInput
            value={searchValue}
            className="finder-input"
            style={{ color: "#616161" }}
            onInput={applyNameFilter}
            label="Search"
          />
        </div>
        <button className="account-button">
          <NavItem icon={<AiIcons.AiOutlineUser className="dropdown-icon" />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </button>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
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
