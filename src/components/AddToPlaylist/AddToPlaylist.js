import "./AddToPlaylist.scss";
import { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllPlaylists} from "../../redux/playlists/playlists-actions"
import {selectAllPlaylistsIds, selectAllPlaylists} from "../../redux/playlists/playlists-selectors"
import { toggleLikeTrack, updateTrack } from "../../redux/tracks/track-actions";
import FLInput from "../FLInput/index.js";
import Button from "../Button/index.js";
import { useForm } from "react-hook-form";
import api from "../../api/playlist-api"
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function AddToPlaylist({ id, closePlaylistModal }) {
  const dispatch = useDispatch();
  const playlists = useSelector(selectAllPlaylists)
  const [createPlaylist, setCreatePlaylist] = useState(false)

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, []);
  console.log(playlists)

  async function addToPlaylist  (e) {
    console.log(e.currentTarget.id)
    await api.postInPlaylist("", e.currentTarget.id, {"trackId": id })
  }

  return (
      
    <div className="add-to-playlist-container">
        {createPlaylist ? <CreatePlaylist closeModal={()=>setCreatePlaylist(false)}/> : 
        <> 
        <div className="add-to-playlist">
            <button className="close-button" onClick={() => closePlaylistModal()}>
                <AiIcons.AiOutlineClose />
            </button>
            <div className="title-head">
                My Playlists
                <button className="create-playlist-button" onClick={() => setCreatePlaylist(true)}>CREATE  PLAYLIST</button>
            </div>
        </div>
        <div className="list-of-playlists">
            {playlists && playlists.map(playlist => {
                return(
                <div className="playlist" id={playlist._id} key={playlist.id} onClick={addToPlaylist}>
                    <div className="playlist-info">
                        <div className="playlist-image">
                            <img src={defaultImage} alt="playlist-image"></img>
                        </div>
                        <p>{playlist.title}</p>
                    </div>
                    <AiIcons.AiOutlinePlus style={{fontSize: "25px"}}/>
                </div>
                )
            })}
        </div>
        </>
        }
    </div>
  )
}

export default AddToPlaylist;