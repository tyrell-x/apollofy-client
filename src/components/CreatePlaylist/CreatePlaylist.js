import "./CreatePlaylist.scss";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../redux/playlists/playlists-actions";

function CreatePlaylist({ closeModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleInput(e) {
    setTitle(e.target.value);
  }
  function savePlaylist() {
    dispatch(createPlaylist({ title: title }));
    closeModal();
  }
  return (
    <div className="create-playlist-container">
      <div className="close-button">
        <button onClick={closeModal}>
          <AiIcons.AiOutlineClose />
        </button>
      </div>
      <div className="title">Create a New Playlist</div>
      <div className="label">Enter Playlist Name</div>
      <input
        className="create-playlist-input"
        placeholder="Playlist Name..."
        type="text"
        onChange={handleInput}
      ></input>
      <div className="save-button">
        <button onClick={savePlaylist}>Save</button>
      </div>
    </div>
  );
}

export default CreatePlaylist;
