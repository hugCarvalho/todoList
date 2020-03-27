import React from "react";
import "./BtnHideCompleted.scss";

export default function BtnHideCompleted() {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  );
}
