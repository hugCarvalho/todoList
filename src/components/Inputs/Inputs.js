import React from "react";
import "./inputs.scss";

//needed for automatic focus behaviour
const Input = React.forwardRef(
  ({ addTodoText, addTodo, getTextValue, isEditing }, ref) => {
    const checkIsValid = () => (addTodoText.trim() ? "valid" : "invalid");

    const styleButton = () => {
      return isEditing
        ? {
            color: "orange",
          }
        : null;
    };
    return (
      <>
        <div className="container__inputs">
          {/* trim() prevents TypeError from appearing in React although app works without it*/}
          <form onSubmit={addTodoText.trim() ? addTodo : null}>
            {/* Add bar */}
            <div className="wrapper__add-todo">
              <input
                type="search"
                className={`${checkIsValid()} ${"add-todo"}`}
                placeholder="enter title..."
                name="addTodoText"
                value={addTodoText}
                onChange={getTextValue}
                ref={ref}
                autoComplete="off"
                required
              />
              <button
                type="submit"
                className="btn__add-todo"
                style={styleButton()}
              >
                <span className="btn-text">{isEditing ? "Edit" : "Add"}</span>
              </button>
            </div>

            {/* Search bar */}
            <div className="wrapper__search-todo">
              <i className="fas fa-search"></i>
              <input
                type="search"
                className="search-todo"
                placeholder="search..."
                name="searchFieldValue"
                onChange={getTextValue}
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </>
    );
  }
);

export default Input;
