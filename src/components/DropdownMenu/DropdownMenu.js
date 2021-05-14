import React from "react";
import { useDispatch } from "react-redux";
import DropdownItem from "../DropdownItem";
import { CgProfile } from "react-icons/cg";
import { signOut } from "../../redux/auth/auth-actions";
import { FaSignOutAlt } from "react-icons/fa";

function DropdownMenu() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div className="dropdown">
      <DropdownItem leftIcon={<CgProfile />} path={"/profile"}>
        Profile
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

export default DropdownMenu;
