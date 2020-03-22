import React from "react";
import "./Item.scss";

export default function Item({ remove, title, toggle, completed, edit }) {
  console.log("ITEM");
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={completed ? true : false}
        onChange={toggle}
      />
      <div className="wrapper__title-edit">
        <span>{title}</span>
        <span onClick={edit}>
          <a href="#">edit</a>
        </span>
      </div>
      <button onClick={remove}>X</button>
    </li>
  );
}
