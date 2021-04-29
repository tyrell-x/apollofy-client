import React from "react";
import * as MdIcons from "react-icons/md";
import api from "../../api/api";

function DeleteButton({ ...attributes }) {
  return (
    <>
      <button {...attributes} className="track-options">
        <MdIcons.MdDelete />
      </button>
    </>
  );
}

export default DeleteButton;
