import "./CreatePlaylist.scss";
import { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllPlaylists} from "../../redux/playlists/playlists-actions"
import {selectAllPlaylists} from "../../redux/playlists/playlists-selectors"
import api from "../../api/playlist-api"

function CreatePlaylist({ closeModal, setCreatePlaylist, createPlaylist }) {
  const dispatch = useDispatch();
  const playlists = useSelector(selectAllPlaylists)
  const [title, setTitle] = useState("")
  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, []);
  
  function handleInput (e) {
    setTitle(e.target.value)
  }
  async function savePlaylist () {
    await api.createPlaylist("", {"title": title})
    dispatch(fetchAllPlaylists());
    await closeModal()
  }
  console.log(title)
  return (
    <div className="create-playlist-container">
      <div className="close-button">
        <button onClick={closeModal}>
          <AiIcons.AiOutlineClose />
        </button>
      </div>
      <div className="title">Create a New Playlist</div>
      <div className="label">Enter Playlist Name</div>
      <input className="create-playlist-input" placeholder="Playlist Name..."type="text" onChange={handleInput}></input>
      <div className="save-button">
        <button onClick={savePlaylist}>Save</button>
      </div>
    </div>
  )
}

export default CreatePlaylist;