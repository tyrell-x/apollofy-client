import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
// import { signOut } from "../../redux/auth/auth-actions";
// import { authSelector } from "../../redux/auth/auth-selectors";
import { useState } from "react";


import ProfileMenu from "../ProfileMenu"
import "./Header.scss";

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
        src="http://dummyimage.com/50x50/000/fff.gif&text=profle"
        alt="profile"
      ></img>
      {!isOpen && <ProfileMenu/>}
    </div>
  );

  return (
    <header className="header_container">

      {logo}

      {profile}






       {/* <nav className="flex align-items-middle">
        <ul className="list-none flex">
          <li className="mr-4 px-3 py-2 bg-gray-600">
            <NavLink to={ROUTES.HOME}>Home</NavLink>
          </li>
    
              <li className="mr-4 px-3 py-2 bg-gray-600">
                <NavLink to={ROUTES.LOGIN}>Login</NavLink>
              </li>
              <li className="mr-4 px-3 py-2 bg-gray-600">
                <NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink>
              </li>

          <li className="mr-4 px-3 py-2 bg-gray-600">
            <NavLink to={ROUTES.RESET_PASSWORD}>Reset password</NavLink>
          </li>
        </ul>  */}

        {/* {isAuthenticated && (
          <button
            className="btn btn-primary m-0"
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )} */}
      {/* </nav> */}
    </header>
  );
}

export default Header;
