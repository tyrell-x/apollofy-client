import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {followUser} from "../../redux/users/users-actions"
import "./FollowUser.scss";

function FollowUser({ id, followed }) {
  const dispatch = useDispatch();
  const followToggle = () => {
    dispatch(followUser(id, !followed))
  };
  
  return (
    <button
      className={`follow-button ${followed ? "following-button" : "follow-button"}`}
      onClick={() => followToggle()}
    >
      {followed ? "Following" : "Follow"}
    </button>
  );
}

export default FollowUser;
