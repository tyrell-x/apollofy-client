import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/profile/profile-actions";
import ProfileInfo from "../../components/ProfileInfo"
import ProfileBar from "../../components/ProfileBar"
import "./Profile.scss";
import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import { authSelector } from "../../redux/auth/auth-selectors";
import { statement } from "@babel/template";

function Profile() {
  const profile = useSelector((state) => state.profile)

  return (
    <div className="background">
        <ProfileInfo />
        <ProfileBar />
    </div>
  );
}

export default Profile;
