import React from "react";
import "./Item.scss";

export default function Item({ remove, title, toggle, completed, edit }) {
  const styleCompleted = () =>
    completed
      ? {
          color: "gray",
          textDecoration: "line-through"
        }
      : null;

  return (
    <li className="todo-item">
      <div className="wrapper__checkbox-title">
        <label>
          <input
            type="checkbox"
            checked={completed ? true : false}
            onChange={toggle}
          />
          <span style={styleCompleted()}>{title}</span>
        </label>
      </div>
      <div className="wrapper__edit-delete">
        <span onClick={edit}>
          <button title="edit" className="btn-edit">
            <i className="fas fa-edit"></i>
          </button>
        </span>
        <button onClick={remove} title="delete" className="btn-delete">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
