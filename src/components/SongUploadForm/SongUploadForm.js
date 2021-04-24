import { useEffect, useRef } from "react";
import { Flipped, spring } from "react-flip-toolkit";
import { useDispatch } from "react-redux";
import FLInput from "../../components/FLInput";
import {
  unsetSongToUpload,
  updateSongToUpload,
  uploadSong,
} from "../../redux/uploader/uploader-actions";
import ProgressButton from "../ProgressButton/index";
import anime from 'animejs'

const SongUploadForm = ({ song, upload }) => {
  const dispatch = useDispatch();
  const {
    data = {},
    isUploading = false,
    progress,
    failed = false,
    succeeded = false,
  } = song;

  const formRef = useRef(null);

  useEffect(() => {
    console.log('updating', data.id)
  }, [data]);

  useEffect(() => {
    if (succeeded) {
      setTimeout(() => {
        dispatch(unsetSongToUpload(data.id));
      }, 1000);
    }
  }, [data.id, dispatch, succeeded]);

  useEffect(() => {
    if (upload && !isUploading) {
      const form = formRef.current;
      if (form) {
        if (typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      }
    }
  }, [isUploading, upload]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      uploadSong({
        songData: data,
      }),
    );
  }

  function handleInput(e) {
    dispatch(
      updateSongToUpload(data.id, {
        [e.target.name]: e.target.value,
      }),
    );
  }

  const onAppear = (el, i) => {
    const {top} = el.getBoundingClientRect()
    anime({
      begin: () => {
        el.style.opacity = null
      },
      targets: el,
      translateY: window.innerHeight/2 - top,
      direction: 'reverse',
      duration: 300,
      easing: 'easeOutSine',
      endDelay: 75 * i,
    })
  }

  const onExit = (el, i, removeElement) => {
    anime({
      targets: el,
      translateY: 100,
      opacity: 0,
      duration: 300,
      easing: 'easeInSine',
      delay: 75 * i,
      complete: removeElement,
    })
    return removeElement
  }

  return (
    <Flipped
    key={song.data.id}
    flipId={song.data.id}
    onAppear={onAppear}
    onExit={onExit}>
      <form className="song-upload-form" onSubmit={handleSubmit} ref={formRef}>
        <div className="file-data-inputs">
          <FLInput
            required
            disabled={isUploading || succeeded}
            label="Artist"
            name="artist"
            borderMode="bottom"
            value={data?.artist || ""}
            onChange={handleInput}
          />
          <FLInput
            required
            disabled={isUploading || succeeded}
            label="Title"
            name="title"
            borderMode="bottom"
            value={data?.title || ""}
            onChange={handleInput}
          />
          <FLInput
            disabled={isUploading || succeeded}
            className="year"
            label="Year"
            name="year"
            borderMode="bottom"
            value={data?.year || ""}
            onChange={handleInput}
          />
          <ProgressButton
            text={succeeded ? "uploaded!" : "upload"}
            progress={progress}
            type="submit"
            disabled={isUploading}
            className={`upload-button`}
          />
        </div>
      </form>
    </Flipped>
  );
};

export default SongUploadForm;
