import "./PlaylistCard.scss";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors.js";
import AnimatedListItem from "../AnimatedListItem/index.js";
import ReactCardFlip from "react-card-flip";
import LikeButton from "../LikeButton/index.js";
import Dropdown from "../Dropdown/index.js";
import DeleteButton from "../DeleteButton/index.js";

const defaultImage =
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440";

export default function PlaylistCard({ id }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const timer = useRef(null)

  const playlist = useSelector(selectPlaylist(id)) || {};

  const flip = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsFlipped(true), 300);
  }

  const unflip = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsFlipped(false), 300);
  }

  return (
    <AnimatedListItem key={id} flipId={id}>
      <div
        className="playlist-card"
        onMouseEnter={flip}
        onMouseLeave={unflip}
      >
        <div className="flippable">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div
              className="frontface"
              style={{
                backgroundImage: `url(${defaultImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="backface">
              <div className="playlist-tracks">
                <ol>
                  {playlist.tracks.map((track) => (
                    <li key={track.id}>{track.title}</li>
                  ))}
                </ol>
              </div>
            </div>
          </ReactCardFlip>
        </div>

        <div className="playlist-info">
          <div className="">{playlist.title}</div>
        </div>
      </div>
    </AnimatedListItem>
  );
}
