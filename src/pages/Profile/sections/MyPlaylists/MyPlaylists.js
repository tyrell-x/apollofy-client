import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {selectOwnedPlaylistsIds} from "../../../../redux/playlists/playlists-selectors"
import {fetchAllPlaylists} from "../../../../redux/playlists/playlists-actions"
import PlaylistCard from "../../../../components/PlaylistCard"
import { onAuthStateChanged } from "../../../../services/auth/auth.js";
import "./MyPlaylists.scss"

function MyPlaylists () {
    const ownedPlaylistIds = useSelector(selectOwnedPlaylistsIds);
    const dispatch = useDispatch()
    console.log(ownedPlaylistIds)
    useEffect(() => {
        onAuthStateChanged((user) => {
          if (user) {
            dispatch(fetchAllPlaylists())
          }
        });
      }, []);
    return (
        <div className="playlists-container-profile">
          <div className="profile-playlists">
            {(ownedPlaylistIds || []).map((id) => (
              <PlaylistCard id={id} key={id} />
            ))}
          </div>
        </div>

    )
}

export default MyPlaylists