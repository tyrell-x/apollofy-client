import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
// import { authSelector } from "../../redux/auth/auth-selectors";
import { useState, useEffect } from "react";


import {getUserData} from "../../redux/profile/profile-actions";
import ProfileMenu from "../ProfileMenu"
import ModalWindow from "../ModalWindow"
import "./Header.scss";
import AppLogo from "../../assets/images/logo.png";
import {Dropdown, DropdownItem, DropdownMenu} from "reactstrap";

function Header() {

  // const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData())
  }, []);
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector(authSelector);
  const [isOpen, setIsOpen] = useState(true);

function handleSignOut(){
  dispatch(signOut());
}

function Settings(){
  setIsOpen(!isOpen)
}

  const logo = (
    <button>
    <NavLink to={ROUTES.HOME}>
      <img
        src={AppLogo}
        alt="logo"
        className="logo_apollofy"
      ></img>
    </NavLink>
    </button>
  );

  const profile = (
    <div>
          <img
            onClick={Settings}
            src="http://dummyimage.com/50x50/000/fff.gif&text=Profile"
            alt="profile"
            className="profileImg"
          ></img>
      {!isOpen &&
        <Dropdown isOpen={isOpen}>
          <DropdownMenu>
            <DropdownItem>
              <ProfileMenu/>
            </DropdownItem>
            <DropdownItem
              type="button"
              onClick={handleSignOut}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      }
    </div>
  );

  return (
    <header className="header_container">
      {logo}

      {profile}

    </header>

  );

}

export default Header;