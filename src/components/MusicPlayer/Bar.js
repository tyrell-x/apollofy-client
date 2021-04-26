import "./Bar.scss";
import { useRef } from "react";
import { useAudioPosition } from "react-use-audio-player";
import { getCounter } from "../../utils/utils.js";

export default function Bar() {
  const { percentComplete, duration, position, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  const bar = useRef(null)

  const updateTrackProgress = (event) => {
    const { width, left } = bar.current.getBoundingClientRect();
    const percentageClicked = (event.clientX - left)/width;
    seek(duration*percentageClicked)
  }

  return (
    <div className="bar-container">
      <span>{getCounter(position)}</span>
      <div ref={bar} className="bar" onClick={updateTrackProgress}>
        <div
          className="bar__progress"
          style={{
            width: `${percentComplete}%`,
          }}
          onMouseDown={() => {}}
        ></div>
        <span
          className="bar__progress__knob"
          style={{ left: `${percentComplete}%` }}
        />
      </div>
      <span>{ getCounter(duration)}</span>
    </div>
  );
}