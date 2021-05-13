import "./EditPlaylist.scss";

import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";
import { selectPlaylist } from "../../redux/playlists/playlists-selectors";
import { useDispatch, useSelector } from "react-redux";
import FLInput from "../FLInput/index.js";
import Button from "../Button/index.js";
import { useForm } from "react-hook-form";
import { updatePlaylist, editPlaylist } from "../../redux/playlists/playlists-actions";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function EditPlaylist({ id, closeModal }) {
  const dispatch = useDispatch();

  const { thumbnail = defaultImage, title } = useSelector(selectPlaylist(id));

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
    console.log(data)
    dispatch(editPlaylist(id, data));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-track">
      <button className="close-button" onClick={() => closeModal()}>
        <AiIcons.AiOutlineClose />
      </button>
      <div className="track-image">
        <img alt="thumbnail" src={thumbnail}></img>
      </div>
      <div className="track-inputs">
        <FLInput
          name="title"
          label="title"
          borderMode="bottom"
          register={register}
          rules={{
            maxLength: {
              value: 20,
              message: "Max length (20)",
            },
          }}
          error={errors?.title}
        />
      </div>
      <Button type="submit">Submit Changes</Button>
    </form>
  );
}

export default EditPlaylist;
