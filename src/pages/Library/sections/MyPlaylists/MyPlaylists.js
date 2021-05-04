import "./MyPlaylists.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../../../../components/PlaylistCard";

import { fetchAllPlaylists } from "../../../../redux/playlists/playlists-actions.js";
import { selectAllPlaylistsIds } from "../../../../redux/playlists/playlists-selectors.js";
import Button from "../../../../components/Button/index.js";

function MyPlaylists() {
  const dispatch = useDispatch();
  const allPlaylistIds = useSelector(selectAllPlaylistsIds);

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, []);

  return (
    <div className="library-content">
      <div className="playlists-header">
        <Button>Create Playlist</Button>
      </div>
      <div className="playlists">
        <div className="playlists-container">
          <h3>Owned Playlists</h3>
          <div className="yourplaylists">
            {(allPlaylistIds || []).map((id) => (
              <PlaylistCard id={id} key={id} />
            ))}
          </div>
        </div>
        <div className="playlists-container">
          <h3>Followed Playlists</h3>
          <div className="followedplaylists">
            {(allPlaylistIds || []).map((id) => (
              <PlaylistCard id={id} key={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPlaylists;
