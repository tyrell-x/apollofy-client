import React from "react";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth/auth-actions";

import * as ROUTES from "../../routes";
import "./ProfileMenu.scss"

function ProfileMenu() {
    // const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    function handleSignOut(){
        dispatch(signOut());
    }

    return (
        <ul>
          <li>
            <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
          </li>
        </ul>
    );
}

export default ProfileMenu;
