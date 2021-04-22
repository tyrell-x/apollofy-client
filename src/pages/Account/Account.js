import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../routes";
import { useSelector, useDispatch } from "react-redux";

import "./Account.scss";
import Header from "../../components/Header";
import TabMenu from "../Account/sections/TabMenu";

const DEFAULT_PROFILE_IMAGE =
  "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg";

function Account() {
  const profile = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <Header />
      <main className="main_container">
        <div className="main_container__profileImg">
          <img
            alt="profile"
            src={
              profile.pictureUrl ? profile.pictureUrl : DEFAULT_PROFILE_IMAGE
            }
            className="main_container__icon"
          ></img>
          <button>Change Image</button>
        </div>
        <TabMenu />
      </main>
    </>
  );
}

export default Account;
