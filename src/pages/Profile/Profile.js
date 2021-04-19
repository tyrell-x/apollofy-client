import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/actions/index";
import "./Profile.scss";
import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import { authSelector } from "../../redux/auth/auth-selectors";
import { statement } from "@babel/template";

function Profile() {
  useEffect(() => {
    getProfileInfo();
  }, []);

  const apiUrl = "http://apollo.eu-west-3.elasticbeanstalk.com/api/account";
  async function getProfileInfo() {
    await fetch(apiUrl).then((data) => console.log(data));
  }

  return (
    <div className="background">
      <div className="profile-info">
        <img src=""></img>
        <h3>Daniel Rovira</h3>
        <p>danielrovira@gmail.com</p>
      </div>
    </div>
  );
}

export default Profile;
