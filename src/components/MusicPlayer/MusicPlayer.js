import "./MusicPlayer.scss";

import Bar from "./Bar.js";
import { useDispatch, useSelector } from "react-redux";
import Controls from "./Controls.js";
import { addTracksToPlayer } from "../../redux/player/player-actions.js";
import { playingTrackSelector } from "../../redux/player/player-selectors.js";
import { useEffect } from "react";

export default function Player() {
  const dispatch = useDispatch();

  const currentTrack = useSelector(playingTrackSelector);

  useEffect(() => {
    console.log(currentTrack);
  }, [currentTrack]);

  /*
  useEffect(() => {
    dispatch(
      addTracksToPlayer([
        "6082e15cb89bc999292b17df",
        "6082a2bd307e631c6b995b93",
      ]),
    );
  }, []);
  */

  return (
    <div className="music-player-container">
      <div className="track-info">
        {currentTrack?.artist} - {currentTrack?.title}
      </div>
      <div className="music-player">
        <Controls />
        <Bar />
      </div>
    </div>
  );
}
