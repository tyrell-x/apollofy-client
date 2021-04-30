import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "./PlaylistCard";

import { fetchAllPlaylists } from "../../../../redux/playlists/playlists-actions.js";
import { selectAllPlaylistsIds } from "../../../../redux/playlists/playlists-selectors.js";
function MyPlaylists() {
  const dispatch = useDispatch();
  const allPlaylistIds = useSelector(selectAllPlaylistsIds);

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, []);

  return (
    <div className="library-content">
      {(allPlaylistIds || []).map((id) => (
        <PlaylistCard id={id} key={id} />
      ))}
    </div>
  );
}

export default MyPlaylists;
