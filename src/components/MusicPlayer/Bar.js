import { useEffect } from "react";
import { useAudioPosition } from "react-use-audio-player";

export default function Bar() {
  const { percentComplete, duration, seek } = useAudioPosition({
    highRefreshRate: false,
  });

  useEffect(() => {
      console.log(percentComplete)
  }, [percentComplete])

  return (
    <div className="bar">
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${percentComplete}%, white 0)`,
        }}
        onMouseDown={() => {}}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${percentComplete - 2}%` }}
        />
      </div>
    </div>
  );
}
