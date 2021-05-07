import React from "react";
import { useDispatch } from "react-redux";
import DeleteButton from "../DeleteButton/index.js";
import Dropdown from "../Dropdown";
import Modal from "react-modal";
import EditTrack from "../EditTrack/index.js";
import { signOut } from "../../redux/auth/auth-actions";


function PlaylistOptions() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div className="playlistOptions dropdown">
          <Dropdown isOpen={dropdownIsOpen} setIsOpen={setDropdownIsOpen}>
            {/* EDIT PLAYLIST DETAILS */}
            <div
              onClick={() => {
                openModal();
                setDropdownIsOpen(false);
              }}
            >
              Edit Playlist
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <EditTrack id={id} closeModal={() => closeModal()} />
              </Modal>
            </div>


            {/* SEE MORE INFORMATION ABOUT THE CREATOR */}
            <div
              onClick={() => {
                openModal();
                setDropdownIsOpen(false);
              }}
            >
              Edit Playlist
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <EditTrack id={id} closeModal={() => closeModal()} />
              </Modal>
            </div>


              {/* SHARE PLAYLIST */}
              <button onClick={toggleTrackInPlayer}>SHARE PLAYLIST</button>


              {/* DELETE PLAYLIST PLAYLIST */}
            <DeleteButton onClick={onDeleteButtonClick}></DeleteButton>
          </Dropdown>
    </div>
  );
}

export default DropdownMenu;
