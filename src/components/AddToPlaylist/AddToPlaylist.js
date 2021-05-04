import "./AddToPlaylist.scss";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeTrack, updateTrack } from "../../redux/tracks/track-actions";
import FLInput from "../FLInput/index.js";
import Button from "../Button/index.js";
import { useForm } from "react-hook-form";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function AddToPlaylist({ id, closePlaylistModal }) {
  const dispatch = useDispatch();

  const { thumbnail = defaultImage, title } = useSelector(selectTrack(id));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
    },
  });

  const onSubmit = async (data) => {
    dispatch(updateTrack(id, data));
    closePlaylistModal();
  };

  return (
    <div>
        <div className="add-to-playlist">
            <button className="close-button" onClick={() => closePlaylistModal()}>
                <AiIcons.AiOutlineClose />
            </button>
            <div className="title-head">My Playlists</div>

        </div>
    </div>
  )
}

export default AddToPlaylist;