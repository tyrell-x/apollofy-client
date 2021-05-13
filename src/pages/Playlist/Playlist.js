import "./Playlist.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors.js";
import { getCounter } from "../../utils/utils.js";
import Button from "../../components/Button/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPaperPlane,
  faTrash,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { setTracksInPlayer } from "../../redux/player/player-actions.js";
import { useEffect} from "react";
import { onAuthStateChanged } from "../../services/auth/auth.js";
import {
  fetchAllPlaylists,
  updatePlaylist,
  deletePlaylist,
} from "../../redux/playlists/playlists-actions.js";
import FollowPlaylist from "../../components/FollowPlaylist";
import PlaylistOptions from "../../components/PlaylistOptions";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard/useCopyToClipboard";

const defaultImage =
  "https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg";

function Playlist() {
  const playlistLink = useLocation().pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteSuccess = useSelector(
    (routeState) => routeState.playlists.playlistDeleteSuccess,
  );
  const deletePostSuccess = useSelector(
    (routeState) => routeState.playlists.playlistDeletePostSuccess,
  );
  const [isCopied, handleCopy] = useCopyToClipboard();

  useEffect(() => {
    if (deleteSuccess) {
      history.push("/library");
    }
  }, [deleteSuccess]);

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchAllPlaylists());
      }
    });
  }, [dispatch]);

  const { id } = useParams();
  const playlist = useSelector(selectPlaylist(id));

  const playPlaylist = () => {
    dispatch(setTracksInPlayer(playlist.tracks.map((track) => track._id)));
  };

  const handleDeletePlaylist = () => {
    dispatch(deletePlaylist(id));
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const reorderedTracks = Array.from(
      playlist.tracks.map((track) => track._id),
    );
    const [reorderedItem] = reorderedTracks.splice(result.source.index, 1);
    reorderedTracks.splice(result.destination.index, 0, reorderedItem);

    dispatch(updatePlaylist({ ...playlist, tracks: reorderedTracks }));
  }

  return (
    <div className="playlist-page">
      <div className="summary">
        <div className="image">
          <img
            src={playlist.thumbnail || defaultImage}
            height="280"
            alt="playlist"
          ></img>
        </div>
        <div className="details">
          <h5 className="type">PLAYLIST</h5>
          <h4 className="title">{playlist.title}</h4>
          <div className="actions">
            <Button onClick={playPlaylist} className="play-button">
              <FontAwesomeIcon icon={faPlay} />
              <span className="play-text">Play</span>
            </Button>
            {/* HERE GOES ACTION ELIMINATE */}
            {/* Only show if you own the playlist */}
            <Button onClick={handleDeletePlaylist} className="trash-button">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            {/* HERE GOES ACTION SEND */}
            
            <Button
              className="send-button"
              onClick={() => handleCopy(playlistLink)}
            >
              {isCopied ? (
                <FontAwesomeIcon icon={faClipboard} />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} />
              )}
            </Button>
            {/* HERE GOES ACTION OPTIONS */}
            <PlaylistOptions id={id} />
            <FollowPlaylist id={id} followed={playlist.followed} />
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div
              className="tracks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {playlist.tracks.map((track, index) => (
                <Draggable
                  key={track._id}
                  draggableId={track._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="track"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="image">
                        <img
                          src={track.thumbnail}
                          alt="track"
                          height="100%"
                        ></img>
                      </div>
                      <div className="details">
                        <div className="title">{track.title}</div>
                        <div className="artist">
                          {track.artist || "anonymous"}
                        </div>
                      </div>
                      <div className="owner">{track.owned ? "Owned" : ""}</div>
                      <div className="duration">
                        {getCounter(track.duration)}
                      </div>
                      <div className="actions"></div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Playlist;
