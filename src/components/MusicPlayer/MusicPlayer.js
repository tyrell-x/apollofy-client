import "./MusicPlayer.scss";

import { useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import Bar from "./Bar.js";
import { useDispatch, useSelector } from "react-redux";
import { playerTracksSelector } from "../../redux/player/player-selectors.js";
import {
  addTracksToPlayer,
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

export default function Player() {
  const dispatch = useDispatch();

  const { tracks, currentTrack } = useSelector(playerTracksSelector);

  const {
    play,
    pause,
    stop,
    volume,
    load,
    playing: wasPlaying,
  } = useAudioPlayer();

  const [playing, setPlaying] = useState(wasPlaying);

  useEffect(() => {
    if (tracks.length) {
      load({
        src: tracks[currentTrack].data.url,
        autoplay: playing,
        onend: () => dispatch(setNextTrack()),
      });
    }
  }, [currentTrack]);

  /*
  useEffect(() => {
    dispatch(
      addTracksToPlayer([
        {
          url:
            "http://res.cloudinary.com/tyrell/video/upload/v1619138409/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/02%20Robbin%27%20Banks.mp3.mp3",
          name: "Canción 1",
          artist: "Aritsta 1",
        },
        {
          url:
            "http://res.cloudinary.com/tyrell/video/upload/v1619190108/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/07%20-%20Place%20To%20Be.flac.flac",
          name: "Canción 2",
          artist: "Aritsta 2",
        },
        {
          url:
            "http://res.cloudinary.com/tyrell/video/upload/v1619173388/audio/qB1TyeTpuaN81ZKwL1CaANFPPxQ2/08%20-%20Needle%20Of%20Death.flac.flac",
          name: "Canción 3",
          artist: "Aritsta 3",
        },
      ]),
    );
  }, []);
  */

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
    setPlaying(true);
  };

  const handlePause = () => {
    pause();
    setPlaying(false);
  };

  const handleStop = () => {
    stop();
    setPlaying(false);
  };

  return (
    <div className="music-player-container">
      <div className="track-info">
        {tracks[currentTrack]?.data.artist} - {tracks[currentTrack]?.data.name}
      </div>
      <div className="music-player">
        <div className="controls">
          <button className="control__button" onClick={() => playPrevious()}>
            {" "}
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          {playing ? (
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
        <Bar />
      </div>
    </div>
  );
}
