import React from "react";

import { useDispatch } from "react-redux";
import { followPlaylist } from "../../redux/playlists/playlists-actions";
import "./FollowPlaylist.scss";

function FollowPlaylist({ id, followed }) {
  const dispatch = useDispatch();
  const followToggle = () => {
    dispatch(followPlaylist(id, !followed));
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

export default FollowPlaylist;
