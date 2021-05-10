import "./MyPlaylists.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../../../../components/PlaylistCard";

import { fetchAllPlaylists } from "../../../../redux/playlists/playlists-actions.js";
import { selectAllPlaylistsIds } from "../../../../redux/playlists/playlists-selectors.js";
import Button from "../../../../components/Button/index.js";
import { onAuthStateChanged } from "../../../../services/auth/auth.js";
<<<<<<< HEAD
import CreatePlaylist from "../../../../components/CreatePlaylist"
=======
import CreatePlaylist from "../../../../components/CreatePlaylist";
>>>>>>> 2f312819e2de71baa37ab7fb5dabf2217df68c61

function MyPlaylists() {
  const dispatch = useDispatch();
  const allPlaylistIds = useSelector(selectAllPlaylistsIds);
<<<<<<< HEAD
  const [createPlaylist, setCreatePlaylist] = useState(false)

  function closeModal() {
    setCreatePlaylist(false)
    dispatch(fetchAllPlaylists());
=======
  const [createPlaylist, setCreatePlaylist] = useState(false);

  function closeModal() {
    setCreatePlaylist(false);
>>>>>>> 2f312819e2de71baa37ab7fb5dabf2217df68c61
  }
  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchAllPlaylists());
      }
    });
  }, [dispatch]);
  console.log(createPlaylist)
  return (
    <div className="library-content">
      <div className="playlists-header">
<<<<<<< HEAD
        <Button onClick={()=>setCreatePlaylist(true)}>
          Create Playlist
        </Button>
        {createPlaylist ? 
          <div className="create-playlist-bg">
            <CreatePlaylist closeModal={()=> closeModal()}/> 
          </div>
          : ""}
=======
        <Button onClick={() => setCreatePlaylist(true)}>Create Playlist</Button>
        {createPlaylist ? (
          <div className="create-playlist-bg">
            <CreatePlaylist closeModal={() => closeModal()} />
          </div>
        ) : (
          ""
        )}
>>>>>>> 2f312819e2de71baa37ab7fb5dabf2217df68c61
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
