import "./TrackCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { deleteTrack, toggleLikeTrack } from "../../redux/tracks/track-actions";
import { fetchAllPlaylists } from "../../redux/playlists/playlists-actions";
import LikeButton from "../LikeButton";
import AnimatedListItem from "../AnimatedListItem";
import DeleteButton from "../DeleteButton/index.js";
import {
  addTrackToPlayer,
  removeTrackFromPlayer,
} from "../../redux/player/player-actions.js";
import { isTrackInPlayer } from "../../redux/player/player-selectors.js";
import Dropdown from "../Dropdown";
import AddToPlaylist from "../AddToPlaylist";
import Modal from "react-modal";
import EditTrack from "../EditTrack/index.js";
import { useState } from "react";
const customStyles = {
  content: {
    position: "0",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#030303",
    border: "none",
  },
};

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "rgba(200, 200, 200, 0.4)";

function TrackCard({ id }) {
  const dispatch = useDispatch();

  const { name, title, ownedBy, thumbnail = defaultImage, liked } =
    useSelector(selectTrack(id)) || {};

  const trackInPlayer = useSelector(isTrackInPlayer(id));

  const onLikeButtonClick = () => {
    dispatch(toggleLikeTrack(id, !liked));
  };

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

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [playlistModalIsOpen, setPlaylistModalIsOpen] = useState(false);
  function closePlaylistModal() {
    setPlaylistModalIsOpen((state) => {
      return !state;
    });
  }

  
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <AnimatedListItem key={id} flipId={id}>
      <div className="track-card" id={id}>
        <div className="track-image">
          <img src={thumbnail ? thumbnail : defaultImage} alt="track" />
        </div>
        <div className="track-content">
          <div className="track-details">
            <p className="track-name">{name}</p>
            <p className="track-artist">{title}</p>
          </div>
        </div>
        <div className="action-buttons">
          <LikeButton liked={liked} onClick={onLikeButtonClick} />
          <Dropdown isOpen={dropdownIsOpen} setIsOpen={setDropdownIsOpen}>
            <button onClick={toggleTrackInPlayer}>
              {trackInPlayer
                ? "Remove track from player"
                : "Add track to player"}
            </button>
            <div
              onClick={() => {
                openModal();
                setDropdownIsOpen(false);
              }}
            >
              Edit
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <EditTrack id={id} closeModal={() => closeModal()} />
              </Modal>
            </div>
            <div
              onClick={() => {
                setPlaylistModalIsOpen(true);
                setDropdownIsOpen(false);
              }}
            >
              Add to Playlist
            </div>
            <button onClick={toggleTrackInPlayer}>Boton Nuevo</button>
            <DeleteButton onClick={onDeleteButtonClick}></DeleteButton>
          </Dropdown>
          {playlistModalIsOpen ? (
            <div className="playlist-modal-bg">
              <AddToPlaylist
                id={id}
                closePlaylistModal={() => closePlaylistModal()}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </AnimatedListItem>
  );
}

export default TrackCard;
