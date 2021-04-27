import React, { useState, useEffect } from "react";
import "../../../../components/LibraryContent/LibraryContent.scss";
import LibraryItem from "../../../../components/LibraryItem";
import api from "../../../../api-test/api-test";
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png"


function AllTracks() {
  const [allTracks, setAllTracks] = useState([]);
  const [likeState, setLikeState] = useState(false)
  const [deleteState, setDeleteState] = useState(false)

  useEffect(() => {
    async function getAllTracks() {
      const allSongs = await api.getTracks();
      setAllTracks(allSongs);
    }
    getAllTracks();
  }, [likeState]);

  return (
    <div className="library-content">
      {allTracks.data &&
        allTracks.data.map((track) => (
          <LibraryItem
            likeState={likeState}
            setLikeState={setLikeState}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
            id={track.id}
            key={track.id}
            name={track.name}
            artist={track.owner.login}
            image={track.thumbnail !== null ? track.thumbnail : defaultImage}
            liked={track.liked}
          />
        ))}
    </div>
  );
}

export default AllTracks;
