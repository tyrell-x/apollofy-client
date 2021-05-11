import "./AddToPlaylist.scss";
import { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectOwnedPlaylists } from "../../redux/playlists/playlists-selectors";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import { addTrackToPlaylist } from "../../redux/playlists/playlists-actions";
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function AddToPlaylist({ id, closePlaylistModal }) {
  const dispatch = useDispatch();
  const playlists = useSelector(selectOwnedPlaylists);
  const [createPlaylist, setCreatePlaylist] = useState(false);

  async function addToPlaylist(playlistId) {
    dispatch(addTrackToPlaylist(id, playlistId));
  }
  return (
    <div className="add-to-playlist-container">
      {createPlaylist ? (
        <CreatePlaylist closeModal={() => setCreatePlaylist(false)} />
      ) : (
        <>
          <div className="add-to-playlist">
            <button
              className="close-button"
              onClick={() => closePlaylistModal()}
            >
              <AiIcons.AiOutlineClose />
            </button>
            <div className="title-head">
              My Playlists
              <button
                className="create-playlist-button"
                onClick={() => setCreatePlaylist(true)}
              >
                CREATE PLAYLIST
              </button>
            </div>
          </div>
          <div className="list-of-playlists">
            {playlists &&
              playlists.map((playlist) => {
                return (
                  <div
                    className={
                      playlist.tracks.includes(id)
                        ? "playlist included"
                        : "playlist"
                    }
                    key={playlist._id}
                    onClick={() => {
                      if (!playlist.tracks.includes(id)) {
                        addToPlaylist(playlist._id);
                      }
                    }}
                  >
                    <div className="playlist-info">
                      <div className="playlist-image">
                        <img src={defaultImage} alt="playlist-image"></img>
                      </div>
                      <p>{playlist.title}</p>
                    </div>
                    {playlist.tracks.includes(id) ? (
                      ""
                    ) : (
                      <AiIcons.AiOutlinePlus style={{ fontSize: "25px" }} />
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default AddToPlaylist;
