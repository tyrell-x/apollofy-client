import {useSelector} from "react-redux"
import PlaylistCard from "../../../../components/PlaylistCard"
import "./Playlists.scss"
import { selectOwnedByPlaylistsIds } from '../../../../redux/playlists/playlists-selectors.js';

function Playlists ({uid}) {

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