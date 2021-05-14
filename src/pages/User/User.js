import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TabMenu from "./TabMenu";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "../../services/auth/auth.js";
import {
  selectUser,
  selectUsersStore,
} from "../../redux/users/users-selectors";

import "./User.scss";
import { fetchUser } from "../../redux/users/users-actions.js";
import { currentUserSelector, selectCurrentUserId } from "../../redux/auth/auth-selectors.js";
import { fetchAllPlaylists } from "../../redux/playlists/playlists-actions.js";
import PuffLoader from "react-spinners/PuffLoader";
import FollowUser from "../../components/FollowUser/index.js";

function User() {
  const dispatch = useDispatch();

  const { id: paramId } = useParams();
  const { _id: uid, following} = useSelector(currentUserSelector);

  const { userLoading } = useSelector(selectUsersStore);

  const id = paramId || uid;

  const user = useSelector(selectUser(id));

  const isCurrentUser = id === uid;

  console.log(following, uid)

  useEffect(() => {
    onAuthStateChanged((current) => {
      if (current) {
        dispatch(fetchUser(current.uid));
        dispatch(fetchAllPlaylists());
      }
    });
  }, []);

  useEffect(() => {
    if (paramId) {
      dispatch(fetchUser(paramId));
    }
  }, [paramId]);

  return (
    <>
      <div className="profile">
        <div className="profile-container">
          <div className="profile-info-container">
            <div className="profile-image">
              <img
                alt="user"
                src={
                  user.pictureUrl
                    ? user.pictureUrl
                    : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"
                }
              ></img>
            </div>
            <div className="profile-info">
              <p className="profile-info-title">PROFILE</p>
              <p className="profile-info-name">
                {user.firstName ? user.firstName : user.email}
              </p>
              <p className="profile-info-email">{user.email}</p>
            </div>
          </div>
          {isCurrentUser && (
            <div className="edit-profile-button-container">
              <Link to="/account">
                <button className="edit-profile-button">Edit Profile</button>
              </Link>
            </div>
          )}
          {!isCurrentUser && (
            <div className="edit-profile-button-container">
              <div className="follow-user">
                <FollowUser
                  id={id}
                  followed={following?.includes(id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="library-tabs library-tabs-profile">
        <TabMenu
          uid={id}
          followers={user.followedBy}
          following={user.following}
        />
      </div>
      <PuffLoader
        color={"rgb(224, 130, 21)"}
        loading={userLoading}
        size={150}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

export default User;
