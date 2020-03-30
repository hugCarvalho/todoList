import React from "react";
import "./Modal.scss";

export default function modal(props) {
  return <div className="modal">{props.children}</div>;
}
