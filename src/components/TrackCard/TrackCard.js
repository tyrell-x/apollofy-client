import "./TrackCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { deleteTrack, toggleLikeTrack } from "../../redux/tracks/track-actions";
import {fetchAllPlaylists} from "../../redux/playlists/playlists-actions"
import LikeButton from "../LikeButton";
import AnimatedListItem from "../AnimatedListItem";
import DeleteButton from "../DeleteButton/index.js";
import {
  addTrackToPlayer,
  removeTrackFromPlayer,
} from "../../redux/player/player-actions.js";
import { isTrackInPlayer } from "../../redux/player/player-selectors.js";
import Dropdown from "../Dropdown";
import AddToPlaylist from "../AddToPlaylist"
import Modal from "react-modal";
import EditTrack from "../EditTrack/index.js";
import { useEffect, useState } from "react";
import CreatePlaylist  from "../CreatePlaylist"
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
  function openPlaylistModal() {
    setPlaylistModalIsOpen(true);
  }
  function closePlaylistModal() {
    setPlaylistModalIsOpen((state) => {
      console.log(state)
      return !state
    });
    console.log(playlistModalIsOpen)
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
                openPlaylistModal();
                setDropdownIsOpen(false);
              }}
            >
              Add to Playlist
              <Modal
                isOpen={playlistModalIsOpen}
                onRequestClose={closePlaylistModal}
                style={customStyles}
              >
                <AddToPlaylist id={id} closePlaylistModal={() => closePlaylistModal()} />
              </Modal>
            </div>
            <button onClick={toggleTrackInPlayer}>Boton Nuevo</button>
            <DeleteButton onClick={onDeleteButtonClick}></DeleteButton>
          </Dropdown>
        </div>
      </div>
    </AnimatedListItem>
  );
}

export default TrackCard;
