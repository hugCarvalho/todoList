import React from "react";
import "./Output.scss";

//TODO: commit preferences toggle all to loal storage
//TODO: check list and filtered list (with formstate)

export default function output({
  list,
  showAllTodos,
  toggleHideCompleted,
  toggleCheckAll,
  toggleCheckAllStatus,
  openModal
}) {
  const filtered = list.filter(item => !item.props.completed);
  //Set classes for styling with css
  const hideIsActive = () =>
    showAllTodos ? "show-completed" : " hide-is-active";

  return (
    <section className="container__todos">
      <div className="options-top">
        {/* Toggle completed / not completed */}
        <button
          type="button"
          className="btn__toggle-completed"
          onClick={toggleCheckAll}
        >
          {" "}
          {toggleCheckAllStatus ? (
            <i className="far fa-check-square" title="check all"></i>
          ) : (
            <i className="far fa-square" title="uncheck all"></i>
          )}
        </button>

        {/* Hide or show completed */}
        <button
          type="button"
          onClick={toggleHideCompleted}
          className={hideIsActive()}
        >
          {/* {showAllTodos ? ( */}
          <span title="hide completed">
            <i className="far fa-eye-slash"> completed</i>{" "}
            {/*TODO: check font size and type*/}
          </span>
        </button>

        {/* Delete all */}
        <button
          className="delete"
          type="button"
          onClick={openModal}
          title="delete all"
        >
          <i className="fas fa-bomb"> </i>
        </button>
      </div>

      {/* Show if list is empty */}
      <div className="container-todos">
        {list.length === 0 && (
          <p style={{ textAlign: "center" }}>Emptieness...</p>
        )}
        <ul>{showAllTodos ? list : filtered}</ul>
      </div>
    </section>
  );
}
