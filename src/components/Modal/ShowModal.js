import React from "react";
import Modal from "react-modal";
import "./ShowModal.scss";
Modal.setAppElement("#root");

function ShowModal(props) {
  return (
    <div>
      {/* <button onClick={() => setModalIsOpen(true)}>Open Modal WHAT</button> */}
      <Modal
        style={overlay}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
      >
        {props.todoList.length < 1 ? (
          <p>There is nothing to delete...</p>
        ) : (
          <>
            <h2>Warning!</h2>
            <br></br>
            <p>
              You are about to delete ALL your todos. This action is
              irreversible! Continue?
            </p>
            <button onClick={props.closeModal} className="btn modal-cancell">
              Cancell
            </button>
            <button onClick={props.boom} className="btn modal-ok">
              Boom
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

const overlay = {
  overlay: {
    //  backgroundColor: "rgba(200, 255, 255, 0.75)"
    backgroundColor: "rgb(39, 39, 38, .70)"
  },
  content: {
    background: "rgb(48, 47, 47)",
    top: "30%",
    left: "12%",
    right: "12%",
    bottom: "auto%",
    borderColor: "red",
    color: "#cccfcf",

    h2: { color: "green;" }
  }
};

export default ShowModal;
