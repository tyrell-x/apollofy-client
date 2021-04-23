import React, { useState, useEffect } from "react";
import "../../../../components/LibraryContent/LibraryContent.scss";
import LibraryItem from "../../../../components/LibraryItem";
import api from "../../../../api-test/api-test";
function LikedTracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function getLikedTracks() {
      const songs = await api.getTracksLiked();
      setTracks(songs);
      console.log(tracks);
    }
    getLikedTracks();
  }, []);

  return (
    <div className="library-content">
      {tracks.data &&
        tracks.data.map((track) => (
          <LibraryItem
            name={track.name}
            artist={track.owner.login}
            image={track.thumbnail}
          />
        ))}
    </div>
  );
}

export default LikedTracks;
