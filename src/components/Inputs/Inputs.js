import React, { useRef } from "react";
import "./inputs.scss";

// function TextInputWithFocusButton() {
//   const inputEl = useRef(null);
//   const onButtonClick = () => {
//     // `current` points to the mounted text input element
//     inputEl.current.focus();
//   };
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }

const Input = React.forwardRef(
  ({ text, textValue, add, searchItems, editing }, ref) => {
    //console.log("INPUT");
    //console.log(editing);
    const styleButton = () =>
      !editing
        ? null
        : {
            color: "#9acd32",
            borderColor: "#9acd32"
          };
    const showWarning = () =>
      //text !== "" ? { borderColor: "green" } : { borderColor: "red" };
      text.trim() ? "valid" : "invalid";
    return (
      <>
        <div className="container-inputs">
          <form onSubmit={add}>
            <div className="wrapper__add-todo">
              <input
                type="search"
                className={`${showWarning()} ${"add-todo"}`}
                value={text}
                name="text"
                onChange={textValue}
                placeholder="add..."
                autoComplete="off"
                //style={showWarning()}
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

            <div className="wrapper__search-todo">
              <i className="fas fa-search"></i>
              <input
                type="search"
                className="search-todo"
                placeholder="search..."
                //value={text}
                name="searchField"
                onChange={searchItems}
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
