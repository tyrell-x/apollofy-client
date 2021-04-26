import React, { useState, useEffect } from "react";
import "../../../../components/LibraryContent/LibraryContent.scss";
import LibraryItem from "../../../../components/LibraryItem";
import api from "../../../../api-test/api-test";
const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png"

function LikedTracks() {
  const [tracks, setTracks] = useState([]);
  const [likeState, setLikeState] = useState(false)
  useEffect(() => {
    async function getLikedTracks() {
      const songs = await api.getTracksLiked();
      setTracks(songs);
    }
    getLikedTracks();
  }, [likeState]);

  return (
    <div className="library-content">
      {tracks.data &&
        tracks.data.map((track) => (
          <LibraryItem
            likeState={likeState}
            setLikeState={setLikeState}
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

export default LikedTracks;
