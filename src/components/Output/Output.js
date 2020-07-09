import React from "react";
import "./Output.scss";
import PropTypes from "prop-types";

export default function output({
  todoList,
  showAllTodos,
  toggleHideCompleted,
  toggleCheckAll,
  toggleCheckAllStatus,
  setErrorMessage,
  searchFieldValue,
}) {
  const filteredSearchList = todoList.filter(item => {
    return item.props.todoTitle
      .toLowerCase()
      .includes(searchFieldValue.toLowerCase());
  });
  const notCompletedList = filteredSearchList.filter(
    item => !item.props.isCompleted
  );
  //Set class for styling with css
  const toggleHideCompletedClasses = () =>
    showAllTodos ? "show-completed" : " hide-completed";

  const showListIsEmptyMessage = () => {
    return !todoList.length ? (
      <p>Emptieness...</p>
    ) : !filteredSearchList.length ? (
      <p>No match found!</p>
    ) : null;
  };

  return (
    <section className="container__todos">
      <div className="options-top">
        {/* Toggle completed/not completed */}
        <button
          type="button"
          className="btn__toggle-completed"
          onClick={toggleCheckAll}
        >
          {!toggleCheckAllStatus ? (
            <i className="far fa-check-square" title="check all"></i>
          ) : (
            <i className="far fa-square" title="uncheck all"></i>
          )}
        </button>

        {/* Hide or show completed */}
        <button
          type="button"
          aria-label="show or hide completed"
          onClick={toggleHideCompleted}
          className={toggleHideCompletedClasses()}
        >
          {/* {showAllTodos ? ( */}
          <span title="hide completed">
            <i className="far fa-eye-slash"> completed</i>{" "}
          </span>
        </button>

        {/* Delete all */}
        <button
          className="delete"
          type="button"
          onClick={() => setErrorMessage("deleteAll")}
          title="delete all"
        >
          <i className="fas fa-bomb"> </i>
        </button>
      </div>

      <div className="container-todos">
        {/* Show if list or filteredSearchList is empty */}
        {showListIsEmptyMessage()}

        {/* Show all todos or hide completed */}
        <ul>{showAllTodos ? filteredSearchList : notCompletedList}</ul>
      </div>
    </section>
  );
}

output.propTypes = {
  todoList: PropTypes.array,
  showAllTodos: PropTypes.bool,
  toggleHideCompleted: PropTypes.func,
  toggleCheckAll: PropTypes.func,
  toggleCheckAllStatus: PropTypes.bool,
  setErrorMessage: PropTypes.func,
  searchFieldValue: PropTypes.string,
};
