import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./UserCard.scss";
import FollowUser from "../FollowUser";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/users-selectors.js";
import * as ROUTES from "../../routes"

function UserCard({ id }) {
  const user = useSelector(selectUser(id));

  const history = useHistory();

  const redirectToUser = () => {
    history.push(`${ROUTES.PROFILE}/${id}`)
  }

  return (
    <div className="user-card-container">
        <div className="user-card" onClick={redirectToUser}>
          <div className="user-image-container">
            <img
              alt="profile"
              className="user-image"
              src={
                user.pictureUrl
                  ? user.pictureUrl
                  : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"
              }
            ></img>
          </div>
          <div className="user-info">
            <p className="user-name">{user.firstName}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      <div className="follow-user">
        <FollowUser id={id} />
      </div>
    </div>
  );
}

export default UserCard;
