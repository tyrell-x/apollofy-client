import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {fetchAllPlaylists} from "../../../../redux/playlists/playlists-actions"
import PlaylistCard from "../../../../components/PlaylistCard"
import { onAuthStateChanged } from "../../../../services/auth/auth.js";
import "./Playlists.scss"
import { selectOwnedByPlaylistsIds, selectOwnedPlaylistsIds } from '../../../../redux/playlists/playlists-selectors.js';

function Playlists ({uid}) {
    const dispatch = useDispatch()

    const ownedPlaylistsIds = useSelector(selectOwnedByPlaylistsIds(uid))

    return (
        <div className="playlists-container-profile">
          <div className="profile-playlists">
            {(ownedPlaylistsIds || []).map((id) => (
              <PlaylistCard id={id} key={id} />
            ))}
          </div>
        </div>

    )
}

export default Playlists