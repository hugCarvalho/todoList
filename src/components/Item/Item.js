import React from "react";
import "./Item.scss";

export default function Item({
  removeTodo,
  todoTitle,
  toggleTodoCompleted,
  isCompleted,
  editTodo
}) {
  const styleCompleted = () =>
    isCompleted
      ? {
          color: "gray",
          textDecoration: "line-through"
        }
      : null;

  return (
    <li className="todo-item">
      <div className="wrapper__checkbox-title">
        <label>
          {/* Check/Uncheck */}
          <input
            type="checkbox"
            checked={isCompleted ? true : false}
            onChange={toggleTodoCompleted}
          />
          <span style={styleCompleted()}>{todoTitle}</span>
        </label>
      </div>

      <div className="wrapper__edit-delete">
        {/* Edit */}
        <span onClick={editTodo}>
          <button title="edit" className="btn-edit">
            <i className="fas fa-edit"></i>
          </button>
        </span>
        {/* Delete */}
        <button onClick={removeTodo} title="delete" className="btn-delete">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
