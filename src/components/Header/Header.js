import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
// import { signOut } from "../../redux/auth/auth-actions";
// import { authSelector } from "../../redux/auth/auth-selectors";
import { useState } from "react";


import ProfileMenu from "../ProfileMenu"
import ModalWindow from "../ModalWindow"
import "./Header.scss";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

function Header() {
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector(authSelector);
  const [isOpen, setIsOpen] = useState(true);

// function handleSignOut(){
//   dispatch(signOut());
// }

function Settings(){
  setIsOpen(!isOpen)
}

  const logo = (
    <div>
      <img
        src="http://dummyimage.com/50x50/fff/000.gif&text=logo"
        alt="logo"
      ></img>
    </div>
  );

  const profile = (
    <div>
          <img
            onClick={Settings}
            src="http://dummyimage.com/50x50/fff/000.gif&text=profle"
            alt="profile"
            className="profileImg"
          ></img>
      {!isOpen &&
        <Dropdown isOpen={isOpen}>
          <DropdownMenu>
            <DropdownItem>
              <ProfileMenu/>
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