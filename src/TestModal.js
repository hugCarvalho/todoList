import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
Modal.setAppElement("#root");

//function TestModal(props) {
// const [modalIsOpen, setModalIsOpen] = useState(false);
// return (
//   <div>
//     <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
//     <Modal
//       style={overlay}
//       isOpen={modalIsOpen}
//       onRequestClose={() => setModalIsOpen(false)}
//     >
//       <h4>MODAL</h4>
//       <p>{props.message}</p>
//       <button onClick={() => setModalIsOpen(false)}>X</button>
//       <button>OK</button>
//     </Modal>
//   </div>
// );
//}

function TestModal(props) {
  // console.log(props);
  return (
    <div>
      <Modal style={overlay} isOpen={props.isOpen}>
        <h4>MODAL</h4>
        {props.message}
        {props.message2}
        {props.message3}
        <button onClick={() => {}}>X</button>
      </Modal>
    </div>
  );
}

const overlay = {
  overlay: {
    //  backgroundColor: "rgba(200, 255, 255, 0.75)"
    backgroundColor: "rgb(48, 47, 47, 0.75)"
  },
  content: {
    background: "rgb(48, 47, 47)",
    top: "30%",
    left: "20%",
    right: "20%",
    bottom: "30%"
  }
};

TestModal.propTypes = {};

export default TestModal;
