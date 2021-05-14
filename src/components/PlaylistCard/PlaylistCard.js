import "./PlaylistCard.scss";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors.js";
import AnimatedListItem from "../AnimatedListItem/index.js";
import ReactCardFlip from "react-card-flip";
import * as AiIcons from "react-icons/ai";

import { Link } from "react-router-dom";

import * as ROUTES from "../../routes";

const defaultImage =
  "https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg";

export default function PlaylistCard({ id }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const playlist = useSelector(selectPlaylist(id)) || {};

  const timer = useRef(null);

  const flip = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsFlipped(true), 300);
  };

  const unflip = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsFlipped(false), 300);
  };

  useEffect(() => {
    return clearTimeout(timer.current)
  })

  return (
    <AnimatedListItem key={id} flipId={id}>
      <div className="playlist-card" onMouseEnter={flip} onMouseLeave={unflip}>
        <div className="flippable">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div
              className="frontface"
              style={{
                backgroundImage: `url(${playlist.thumbnail || defaultImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="backface">
              <h3>{playlist.title}</h3>
              <div className="playlist-tracks">
                <ol>
                  {playlist.tracks.map((track) => (
                    <li key={track._id}>{track.title}</li>
                  ))}
                </ol>
              </div>
              <div className="playlist-page-button">
                <Link to={`${ROUTES.PLAYLIST}/${id}`}>
                  <span>Details</span>
                  <i>
                    <AiIcons.AiOutlineArrowRight />
                  </i>
                </Link>
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
