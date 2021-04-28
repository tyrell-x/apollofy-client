import { useState } from "react";
import * as BsIcons from "react-icons/bs"
import EditTrack from "../EditTrack"
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      width                 : "500px",
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : "white",
      borderRadius          : "5px"
    }
  };  

  Modal.setAppElement('#root')
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(200, 200, 200, 0.4)';


function ButtonTrackOptions({ id }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="dropdown-icon-container">
      <button href="#" onClick={() => openModal()}>
      <BsIcons.BsThreeDotsVertical id={id}/>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <EditTrack 
        id={id}
        closeModal={closeModal}
      />
      </Modal>
    </div>
  );
}

export default ButtonTrackOptions;