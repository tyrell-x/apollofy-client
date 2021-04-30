import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useRef, useState } from "react";
import TrackCard from "../../../../components/TrackCard";
import { fetchTracks } from "../../../../redux/tracks/track-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTracks } from "../../../../redux/tracks/track-selectors";
import AnimatedList from "../../../../components/AnimatedList";
import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";

function AllTracks() {
  const dispatch = useDispatch();
  function handleOnDragEnd(result) {
    if (!result.destination) return;
  }

  const allTracks = useSelector(selectAllTracks);
  const [filteredTracks, setFilteredTracks] = useState(allTracks);
  const [tracks, updatetracks] = useState(allTrackslist);

  const items = Array.from(tracks);
  const [reorderedItem] = items.splice(result.source.index, 1);

  items.splice(result.destination.index, 0, reorderedItem);
  updatetracks(items);

  useEffect(() => {
    setFilteredTracks(allTracks);
  }, [allTracks]);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  const toggleLiked = useRef(true);
  const applyLikedFilter = () => {
    dispatch({
      type: "FILTER_LIKED_IN_ALL_COLLECTION",
      payload: toggleLiked.current,
    });
    toggleLiked.current = !toggleLiked.current;
  };

  const applyNameFilter = (e) => {
    setFilteredTracks(
      allTracks.filter((track) => track.title.includes(e.target.value)),
    );
  };

  return (
    <div className="library-content">
      <div className="filter-inputs">
        <Button onClick={applyLikedFilter}>FILTER LIKED</Button>
        <FLInput
          borderMode="bottom"
          onInput={applyNameFilter}
          label="filter by name"
        />
        <h3 style={{ color: "#ff8300cc" }}> // Filtros de prueba</h3>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tracks">
      {(provided) => (
      <AnimatedList flipKey={(filteredTracks || []).join("")} className="list tracks" {...provided.droppableProps} ref={provided.innerRef}>
      
        {tracks(filteredTracks || []).map((track) => (
          <TrackCard id={track._id} key={track._id} />
          
        ))}
      
      {provided.placeholder}
      </AnimatedList>
      
      )}
      </Droppable>
      </DragDropContext>
    </div>
  );
}

export default AllTracks;
