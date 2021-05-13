import "./EditTrack.scss";

import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";
import { selectTrack } from "../../redux/tracks/track-selectors";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeTrack, updateTrack } from "../../redux/tracks/track-actions";
import FLInput from "../FLInput/index.js";
import Button from "../Button/index.js";
import { useForm } from "react-hook-form";
import api from "../../api/api.js";

const defaultImage = "https://cdn.onlinewebfonts.com/svg/img_41510.png";

function EditTrack({ id, closeModal }) {
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

export default EditTrack;
