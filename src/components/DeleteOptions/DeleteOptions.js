import React from "react";
import "../LibraryItem/TrackItem.scss";
import * as MdIcons from "react-icons/md";
import api from "../../api/api";

function DeleteOptions({id, deleteState, setDeleteState}) {

    const deleteOneTrack = async () => {
      const delTrack = await api.deleteTrack("", id)
      console.log(delTrack)
    }
    return (
      <>
        <button id={id} onClick={deleteOneTrack} className="track-options">
          <MdIcons.MdDelete  />
        </button>
      </>
    )
  }

export default DeleteOptions