import React from "react";
import "./inputs.scss";

//needed for focus behaviour
const Input = React.forwardRef(
  ({ addTodoText, getTextValue, addTodo, isEditing }, ref) => {
    const showWarning = () => (addTodoText.trim() ? "valid" : "invalid");
    const styleButton = () => {
      return isEditing
        ? {
            color: "#9acd32",
            borderColor: "#9acd32"
          }
        : null;
    };
    return (
      <>
        <div className="container-inputs">
          <form onSubmit={addTodoText.trim() ? addTodo : null}>
            {/* Add bar */}
            <div className="wrapper__add-todo">
              <input
                type="search"
                className={`${showWarning()} ${"add-todo"}`}
                value={addTodoText}
                name="addTodoText"
                onChange={getTextValue}
                placeholder="enter title..."
                autoComplete="off"
                ref={ref}
              />
              <button
                type="submit"
                style={styleButton()}
                className="btn__add-todo"
              >
                {isEditing ? "Edit" : "Add"}
              </button>
            </div>

            {/* Search bar */}
            <div className="wrapper__search-todo">
              <i className="fas fa-search"></i>
              <input
                className="search-todo"
                name="searchFieldValue"
                type="search"
                placeholder="search..."
                autoComplete="off"
                onChange={getTextValue}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
);

export default Input;
