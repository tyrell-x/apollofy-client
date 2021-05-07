import "./Playlist.scss";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors.js";
import { getCounter } from "../../utils/utils.js";
import Button from "../../components/Button/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import { setTracksInPlayer } from "../../redux/player/player-actions.js";
import { useEffect, useState} from "react";
import { onAuthStateChanged } from "../../services/auth/auth.js";
import { fetchAllPlaylists } from "../../redux/playlists/playlists-actions.js";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const defaultImage =
  "https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg";

function Playlist() {

  // const trackList = playlist.tracks
  // // console.log(trackList)

  // const [tracks, updateTracks] = useState(trackList);
  
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
  const [tracks, updateTracks] = useState(playlist.tracks);
  console.log(playlist.tracks)

  const playPlaylist = () => {
    dispatch(setTracksInPlayer(playlist.tracks.map(track => track._id)))
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result)
    const items = Array.from(tracks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(result.destination.index)
    updateTracks(items);
  }

  return (
    <div className="playlist-page">
      <div className="summary">
        <div className="image">
          <img src={playlist.thumbnail || defaultImage} height="280" alt="playlist"></img>
        </div>
        <div className="details">
          <h5 className="type">PLAYLIST</h5>
          <h4 className="title">{playlist.title}</h4>
          <div className="actions">
            <Button onClick={playPlaylist}>
            <FontAwesomeIcon icon={faPlay} />
            <span className="play-text">Play</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="tracks">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
              <div className="tracks" {...provided.droppableProps} ref={provided.innerRef}>
                {playlist.tracks.map((track, index) => {
                  return (
                  <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div 
                            key={track._id} 
                            className="track"  
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}>
                            <div>
                            
                              <div className="image">
                                <img src={track.thumbnail} alt="track" height="100%"></img>
                              </div>

                              <div className="details">
                                <div className="title">{track.title}</div>
                                <div className="artist">{track.artist || "anonymous"}</div>
                              </div>

                              <div className="owner">{track.owned ? "Owned" : ""}</div>
                              <div className="duration">{getCounter(track.duration)}</div>
                              <div className="actions"></div>

                            </div>
                          </div>
                        )}
                    </Draggable>
                      )
                    })}
                  {provided.placeholder}
                </div>
          )};
        </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Playlist;
