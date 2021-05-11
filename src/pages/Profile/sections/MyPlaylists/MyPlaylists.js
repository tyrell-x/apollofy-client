import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {selectOwnedPlaylistsIds} from "../../../../redux/playlists/playlists-selectors"
import {fetchAllPlaylists} from "../../../../redux/playlists/playlists-actions"
import PlaylistCard from "../../../../components/PlaylistCard"

function MyPlaylists () {
    const ownedPlaylistIds = useSelector(selectOwnedPlaylistsIds);
    const dispatch = useDispatch()
    console.log(ownedPlaylistIds)
    useEffect(() => {
        dispatch(fetchAllPlaylists())
    }, [])
    return (
        <div className="playlists-container">
            {(ownedPlaylistIds || []).map((id) => (
              <PlaylistCard id={id} key={id} />
            ))}
        </div>

    )
}

export default MyPlaylists