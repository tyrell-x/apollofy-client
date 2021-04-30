import "./TrackCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { deleteTrack, toggleLikeTrack } from "../../redux/tracks/track-actions";
import LikeButton from "../LikeButton";
import AnimatedListItem from "../AnimatedListItem";
import DeleteButton from "../DeleteButton/index.js";
import {
  addTrackToPlayer,
  removeTrackFromPlayer,
} from "../../redux/player/player-actions.js";
import { isTrackInPlayer } from "../../redux/player/player-selectors.js";
import Dropdown from "../Dropdown";
import Modal from "react-modal";
import EditTrack from "../EditTrack/index.js";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "500px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
    borderRadius: "5px",
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
    dispatch(toggleLikeTrack(id));
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

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
    <AnimatedListItem key={id} flipId={id}>
      <div className="track-card" id={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
            <button onClick={toggleTrackInPlayer}>BOTON nuevo</button>
            <DeleteButton onClick={onDeleteButtonClick}></DeleteButton>
          </Dropdown>
        </div>
      </div>
    </AnimatedListItem>
    )}
    </Draggable>
  );
}

export default TrackCard;
