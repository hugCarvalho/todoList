import React from "react";
import "./inputs.scss";

const Input = React.forwardRef(
  //needed for focus behaviour
  ({ text, textValue, add, searchItems, editing }, ref) => {
    const styleButton = () => {
      return editing
        ? {
            color: "#9acd32",
            borderColor: "#9acd32"
          }
        : null;
    };

    const showWarning = () => (text.trim() ? "valid" : "invalid");

    return (
      <>
        <div className="container-inputs">
          <form onSubmit={text.trim() ? add : null}>
            {/* Add bar */}
            <div className="wrapper__add-todo">
              <input
                type="search"
                className={`${showWarning()} ${"add-todo"}`}
                value={text}
                name="text"
                onChange={textValue}
                placeholder="enter title..."
                autoComplete="off"
                ref={ref}
              />
              <button
                type="submit"
                style={styleButton()}
                className="btn__add-todo"
              >
                {editing ? "Edit" : "Add"}
              </button>
            </div>

            {/* Search bar */}
            <div className="wrapper__search-todo">
              <i className="fas fa-search"></i>
              <input
                className="search-todo"
                name="searchField"
                type="search"
                placeholder="search..."
                autoComplete="off"
                onChange={searchItems}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
);

export default Input;
