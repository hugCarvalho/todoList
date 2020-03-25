import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
Modal.setAppElement("#root");

function TestModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <Modal
        style={overlay}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h4>MODAL</h4>
        <button onClick={() => setModalIsOpen(false)}>X</button>
        <button>OK</button>
      </Modal>
    </div>
  );
}

const overlay = {
  overlay: {
    backgroundColor: "rgba(200, 255, 255, 0.75)"
  },
  content: {
    top: "150px",
    left: "100px",
    right: "100px"
  }
};

TestModal.propTypes = {};

export default TestModal;
