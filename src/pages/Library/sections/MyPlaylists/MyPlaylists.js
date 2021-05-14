import "./MyPlaylists.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../../../../components/PlaylistCard";
import { fetchAllPlaylists } from "../../../../redux/playlists/playlists-actions.js";
import {
  selectOwnedPlaylistsIds,
  selectFollowedPlaylistsIds,
  selectPlaylistStore,
} from "../../../../redux/playlists/playlists-selectors.js";
import Button from "../../../../components/Button/index.js";
import { onAuthStateChanged } from "../../../../services/auth/auth.js";
import CreatePlaylist from "../../../../components/CreatePlaylist";
import PuffLoader from "react-spinners/PuffLoader";

function MyPlaylists() {
  const dispatch = useDispatch();
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const ownedPlaylistIds = useSelector(selectOwnedPlaylistsIds);
  const followedPlaylistIds = useSelector(selectFollowedPlaylistsIds);
  function closeModal() {
    setCreatePlaylist(false);
  }
  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchAllPlaylists());
      }
    });
  }, [dispatch]);

  const { playlistsLoading } = useSelector(selectPlaylistStore);

  return (
    <div className="library-content">
      <div className="playlists-header">
        <Button onClick={() => setCreatePlaylist(true)}>Create Playlist</Button>
        {createPlaylist ? (
          <div className="create-playlist-bg">
            <CreatePlaylist closeModal={() => closeModal()} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="playlists">
        {!!ownedPlaylistIds.length && (
          <div className="playlists-container">
            <h3>Owned Playlists</h3>
            <div className="yourplaylists">
              {(ownedPlaylistIds || []).map((id) => (
                <PlaylistCard id={id} key={id} />
              ))}
            </div>
          </div>
        )}
        {!!followedPlaylistIds.length && (
          <div className="playlists-container">
            <h3>Followed Playlists</h3>
            <div className="followedplaylists">
              {(followedPlaylistIds || []).map((id) => (
                <PlaylistCard id={id} key={id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <PuffLoader
        color={"rgb(224, 130, 21)"}
        loading={playlistsLoading}
        size={150}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

export default MyPlaylists;
