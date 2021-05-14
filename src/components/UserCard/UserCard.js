import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.scss";
import FollowUser from "../FollowUser";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/users-selectors.js";

function UserCard({ id }) {
  const user = useSelector(selectUser(id));

  return (
    <div className="user-card-container">
      <Link to={`/profile/${id}`}>
        <div className="user-card">
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
      </Link>
      <div className="follow-user">
        <FollowUser id={id} />
      </div>
    </div>
  );
}

export default UserCard;
