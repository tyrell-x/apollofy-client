import "./Playlist.scss";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors.js";
import { getCounter } from "../../utils/utils.js";
import Button from "../../components/Button/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { setTracksInPlayer } from "../../redux/player/player-actions.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "../../services/auth/auth.js";
import { fetchAllPlaylists, updatePlaylist } from "../../redux/playlists/playlists-actions.js";
import FollowPlaylist from "../../components/FollowPlaylist";

const defaultImage =
  "https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg";

function Playlist() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchAllPlaylists());
      }
    });
  }, [dispatch]);




  const { id } = useParams();

  const playlist = useSelector(selectPlaylist(id));
  const {tracks} = playlist
  const [tracksPlaylist, updatePlaylistOrder] = useState(tracks);


  const playPlaylist = () => {
    dispatch(setTracksInPlayer(playlist.tracks.map((track) => track._id)));  
  };
  //UPDATE on Drag End
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(tracks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updatePlaylistOrder(items);
    updatePlaylist(items);
    fetchAllPlaylists()
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
            <Button onClick={playPlaylist}>
              <FontAwesomeIcon icon={faPlay} />
              <span className="play-text">Play</span>
            </Button>
            <FollowPlaylist id={id} followed={playlist.followed} />
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div className="tracks" {...provided.droppableProps} ref={provided.innerRef}>
              {tracksPlaylist.map((track, index) => (
                // DIV OF THE TRACK
                <Draggable key={track._id} draggableId={track._id} index={index}>
                  {(provided) => (
                    <div className = "track" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div className="image">
                        <img src={track.thumbnail} alt="track" height="100%"></img>
                      </div>
                      <div className="details">
                        <div className="title">{track.title}</div>
                        <div className="artist">{track.artist || "anonymous"}</div>
                      </div>
                      <div className="owner">{track.owned ? "Owned" : ""}</div>
                      <div className="duration">{getCounter(track.duration)}</div>
                      <div className="actions">
                      </div>
                    </div>
                  )}
                </Draggable>

                // DIV OF THE TRACK
              ))}
            {provided.placeholder}
            </div>
            
          )}
          
        </Droppable>
      </DragDropContext>
      
    </div> //PLAYLIST PAGE CLOSING DIV
  );
                  }

export default Playlist;
