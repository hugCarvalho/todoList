import React from "react";
import Modal from "react-modal";
import "./ShowModal.scss";

Modal.setAppElement("#root");

function ShowModal(props) {
  return (
    <div>
      <Modal
        style={window.innerWidth < 992 ? overlay : overlayBiggerScreens}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
      >
        {/* Local Storage msg */}
        {props.todoList.length < 1 &&
        !props.errorMessage.includes("storage") ? (
          <p>There is nothing to delete...</p>
        ) : (
          <>
            {/* Delete all msg */}
            {props.errorMessage.includes("delete") ? (
              <>
                <h2>Warning!</h2>
                <br></br>
                <p>{props.errorMessage}</p>
                <button
                  onClick={props.closeModal}
                  className="btn modal-cancell"
                >
                  Cancell
                </button>
                <button onClick={props.boom} className="btn modal-ok">
                  Boom
                </button>
              </>
            ) : (
              <>
                {/* List empty msg */}
                <h2>Attention!</h2>
                <br></br>
                <p>{props.errorMessage}</p>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

const overlay = {
  overlay: {
    backgroundColor: "rgb(39, 39, 38, .70)",
  },
  content: {
    background: "rgb(48, 47, 47)",
    top: "30%",
    left: "12%",
    right: "12%",
    bottom: "auto%",
    borderColor: "#ff0000",
    color: "#cccfcf",
  },
};
const overlayBiggerScreens = {
  overlay: {
    backgroundColor: "rgb(39, 39, 38, .70)",
  },
  content: {
    background: "rgb(48, 47, 47)",
    top: "25%",
    left: "31%",
    right: "31%",
    bottom: "auto%",
    borderColor: "#ff0000",
    color: "#cccfcf",
    fontSize: "2.1rem",
    lineHeight: "3.4rem",
  },
};
export default ShowModal;
