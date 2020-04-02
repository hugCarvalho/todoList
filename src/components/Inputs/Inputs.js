import React from "react";
import "./inputs.scss";

//needed for focus behaviour
const Input = React.forwardRef(
  ({ addTodoText, addTodo, getTextValue, isEditing }, ref) => {
    const showWarning = () => (addTodoText.trim() ? "valid" : "invalid");

    const styleButton = () => {
      return isEditing
        ? {
            color: "orange"
            //borderColor: "orange"
          }
        : null;
    };
    return (
      <>
        <div className="container__inputs">
          <form onSubmit={addTodoText.trim() ? addTodo : null}>
            {/* Add bar */}
            <div className="wrapper__add-todo">
              <input
                type="search"
                className={`${showWarning()} ${"add-todo"}`}
                placeholder="enter title..."
                name="addTodoText"
                value={addTodoText}
                onChange={getTextValue}
                ref={ref}
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn__add-todo"
                style={styleButton()}
              >
                {isEditing ? "Edit" : "Add"}
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
