import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../DeleteButton/index.js";
import DropdownPlaylistOptions from "../DropdownPlaylistOptions";
import Modal from "react-modal";
import EditPlaylist from "../EditPlaylist/index.js";
import { signOut } from "../../redux/auth/auth-actions";
import { useState } from "react";
<<<<<<< HEAD
import { deleteTrack, } from "../../redux/tracks/track-actions";
=======
import { deleteTrack } from "../../redux/tracks/track-actions";
>>>>>>> 0e446d181b1103c6110ec8197ceb08c446c52515
import {
  addTrackToPlayer,
  removeTrackFromPlayer,
} from "../../redux/player/player-actions.js";
import { isTrackInPlayer } from "../../redux/player/player-selectors.js";
<<<<<<< HEAD
import "./PlaylistOptions.scss" 

=======
import "./PlaylistOptions.scss";
>>>>>>> 0e446d181b1103c6110ec8197ceb08c446c52515

Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "rgba(200, 200, 200, 0.4)";

<<<<<<< HEAD
function PlaylistOptions({id}) {
  //Use States
  const [dropdownPlaylistOptionsIsOpen, setDropdownPlaylistOptionsIsOpen] = useState(false);
=======
function PlaylistOptions({ id }) {
  //Use States
  const [
    dropdownPlaylistOptionsIsOpen,
    setDropdownPlaylistOptionsIsOpen,
  ] = useState(false);
>>>>>>> 0e446d181b1103c6110ec8197ceb08c446c52515
  const [modalIsOpen, setIsOpen] = useState(false);
  const trackInPlayer = useSelector(isTrackInPlayer(id));

  //Separate functions
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const onDeleteButtonClick = () => {
    dispatch(deleteTrack(id));
  };

  const toggleTrackInPlayer = () => {
    if (trackInPlayer) {
      dispatch(removeTrackFromPlayer(id));
    } else {
      dispatch(addTrackToPlayer(id));
    }
  };

  //Style mock
  const customStyles = {
    content: {
      position: "0",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#030303",
      border: "none",
    },
  };

  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div className="playlistOptions dropdownPlaylistOptions">
<<<<<<< HEAD
          <DropdownPlaylistOptions isOpen={dropdownPlaylistOptionsIsOpen} setIsOpen={setDropdownPlaylistOptionsIsOpen}>
            {/* EDIT PLAYLIST DETAILS */}
            <div
              onClick={() => {
                openModal();
                setDropdownPlaylistOptionsIsOpen(false);
              }}
            >
              Edit Details
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <EditPlaylist id={id} closeModal={() => closeModal()} />
              </Modal>
            </div>


            {/* SEE MORE INFORMATION ABOUT THE CREATOR */}
            <div
              onClick={() => {
                openModal();
                setDropdownPlaylistOptionsIsOpen(false);
              }}
            >
              About Author
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <EditPlaylist id={id} closeModal={() => closeModal()} />
              </Modal>
            </div>
          </DropdownPlaylistOptions>
=======
      <DropdownPlaylistOptions
        isOpen={dropdownPlaylistOptionsIsOpen}
        setIsOpen={setDropdownPlaylistOptionsIsOpen}
      >
        {/* EDIT PLAYLIST DETAILS */}
        <div
          onClick={() => {
            openModal();
            setDropdownPlaylistOptionsIsOpen(false);
          }}
        >
          Edit Details
          <Modal
            className="modalEditPlaylist"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <EditPlaylist id={id} closeModal={() => closeModal()} />
          </Modal>
        </div>

        {/* SEE MORE INFORMATION ABOUT THE CREATOR */}
        <div
          onClick={() => {
            openModal();
            setDropdownPlaylistOptionsIsOpen(false);
          }}
        >
          About Author
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <EditPlaylist id={id} closeModal={() => closeModal()} />
          </Modal>
        </div>
      </DropdownPlaylistOptions>
>>>>>>> 0e446d181b1103c6110ec8197ceb08c446c52515
    </div>
  );
}

export default PlaylistOptions;
