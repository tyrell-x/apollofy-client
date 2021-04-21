import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";
import { useState, useEffect } from "react";

import ProfileMenu from "../ProfileMenu"
import ModalWindow from "../ModalWindow"
import "./Header.scss";
import AppLogo from "../../assets/images/logo.png";
import {Dropdown, DropdownItem, DropdownMenu} from "reactstrap";

function Header() {

    // const profile = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(authSelector);
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
        {/* {!isOpen &&
            <Dropdown isOpen={isOpen}>
            <DropdownMenu>
                <DropdownItem>
                <ProfileMenu/>
                </DropdownItem>
                    {isAuthenticated && (
                <DropdownItem>
                        <button
                            className="btn btn-primary m-0"
                            type="button"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                </DropdownItem>
                    )}
            </DropdownMenu>
            </Dropdown>
        } */}
        </div>
    );

    return (

        <header className="header_container">
        {logo}
        {/* {!isAuthenticated && ( */}
        {profile}

        <ProfileMenu/>
        <button
            className="btn btn-primary m-0"
            type="button"
            onClick={handleSignOut}
        >
            Sign Out
        </button>



    {/* )} */}

    </header>

);

}
export default Header;


{/* <li className="mr-4 px-3 py-2 bg-gray-600"> */}

  {/* <NavLink to={ROUTES.CHANGE_PASSWORD}>Change Password</NavLink> */}

{/* </li> */}