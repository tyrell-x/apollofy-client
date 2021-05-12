import React, { useState, useEffect } from "react";
import { dispatch, useDispatch } from "react-redux";
import "./FollowUser.scss";

function FollowUser({ id, followed }) {
  const dispatch = useDispatch();
  const followToggle = () => {
  };
  return (
    <button
      className={followed ? "following-button" : "follow-button"}
      onClick={() => followToggle()}
    >
      {followed ? "Following" : "Follow"}
    </button>
  );
}

export default FollowUser;
