import "./Controls.scss"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAudioPlayer } from "react-use-audio-player";
import {
    setCurrentlyPlaying,
  setNextTrack,
  setPreviousTrack,
} from "../../redux/player/player-actions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faPause,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { currentlyPlayingSelector, playingTrackSelector } from "../../redux/player/player-selectors.js";

export default function Controls() {
  const dispatch = useDispatch();

  const currentlyPlaying = useSelector(currentlyPlayingSelector);
  const currentTrack = useSelector(playingTrackSelector);

  const {
    play,
    pause,
    stop,
    volume,
    load,
    playing: wasPlaying,
  } = useAudioPlayer();

  useEffect(() => {
    if (currentTrack) {
      load({
        src: currentTrack.url,
        autoplay: currentlyPlaying,
        onend: () => dispatch(setNextTrack()),
      });
    }
  }, [currentTrack]);

  useEffect(() => dispatch(setCurrentlyPlaying(false)), [])

  const playNext = () => {
    stop();
    dispatch(setNextTrack());
  };

  const playPrevious = () => {
    stop();
    dispatch(setPreviousTrack());
  };

  const handlePlay = () => {
    play();
    dispatch(setCurrentlyPlaying(true));
  };

  const handlePause = () => {
    pause();
    dispatch(setCurrentlyPlaying(false));
  };

  const handleStop = () => {
    stop();
    dispatch(setCurrentlyPlaying(false));
  };

  return (
    <div className="controls">
      <button className="control__button" onClick={() => playPrevious()}>
        {" "}
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      {wasPlaying ? (
        <button className="control__button" onClick={handlePause}>
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button className="control__button" onClick={handlePlay}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button className="control__button" onClick={handleStop}>
        <FontAwesomeIcon icon={faStop} />
      </button>
      <button className="control__button" onClick={() => playNext()}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
}
