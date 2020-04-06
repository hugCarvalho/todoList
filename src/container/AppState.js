import React, { Component } from "react";
import Item from "../components/Item/Item";
import { v4 as uuid } from "uuid";
import Inputs from "../components/Inputs/Inputs";
import Output from "../components/Output/Output";
import ShowModal from "../components/Modal/ShowModal";

export default class AppState extends Component {
  state = {
    todoList: [],
    addTodoText: "",
    searchFieldValue: "",
    errorMessage: "",
    isEditing: false,
    showAllTodos: true,
    toggleCheckAll: true,
    modalIsOpen: false,
    inputRef: React.createRef(),
  };

  componentDidMount() {
    this.focusAddTodoField();

    if (localStorage.todosData) {
      try {
        this.setState({
          todoList: JSON.parse(localStorage.getItem("todosData")),
          showAllTodos: JSON.parse(localStorage.getItem("showAllTodos")),
        });
      } catch (error) {
        console.table(error);
        this.setErrorMessage("localStorage");
      }
    }
  }
  componentDidUpdate() {
    const {
      addTodoText,
      todoList,
      showAllTodos,
      isEditing,
      searching,
      searchFieldValue,
      errorMessage,
    } = this.state;
    //console.log("error", this.state.errorMessage);
    const todosData = JSON.stringify(todoList);

    //Optionally create an object for all?...
    localStorage.setItem("todosData", todosData);
    localStorage.setItem("showAllTodos", JSON.stringify(showAllTodos));

    //For control only, delete once app is done
    console.log(
      "UPDATE",
      addTodoText,
      todoList,
      showAllTodos,
      "isEditing:",
      isEditing,
      "searching:",
      searching,
      searchFieldValue.length,
      "errorMsg:",
      errorMessage
    );
  }
  //Gets typed text for add+search fields
  enteredTextHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({
      [name]: value,
    }));
  };
  //AddTodo searchbar
  focusAddTodoField = () => this.state.inputRef.current.focus();

  addTodo = e => {
    const { addTodoText, todoList } = this.state;
    //
    const validText = addTodoText.trim();
    const newTodo = {
      id: uuid(),
      title: `${validText[0].toUpperCase() + validText.substring(1)}  `,
      isCompleted: false,
    };

    e.preventDefault();

    this.setState({
      todoList: [...todoList, newTodo],
      addTodoText: "",
      isEditing: false,
    });
  };

  //Toggle Options
  toggleCheckAll = () => {
    const { todoList, toggleCheckAll } = this.state;

    this.setState({
      todoList: todoList.map(item => {
        toggleCheckAll ? (item.isCompleted = true) : (item.isCompleted = false);
        return item;
      }),
    });
    this.setState(() => ({ toggleCheckAll: !toggleCheckAll }));
  };

  toggleHideCompleted = () =>
    this.setState(() => ({ showAllTodos: !this.state.showAllTodos }));

  toggleTodoCompleted = id => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.map(item => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      }),
    });
  };

  //Edit todos
  editTodo = id => {
    const todo = this.state.todoList.filter(item => item.id === id);
    if (this.state.isEditing) {
      return;
    }
    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id),
      addTodoText: todo[0].title.trim(),
    });
    this.setState(() => ({ isEditing: !this.state.isEditing }));
    this.focusAddTodoField();
  };

  //Remove Todos
  removeTodo = id =>
    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id),
    });
  removeAll = () => {
    this.setState(() => ({
      todoList: this.state.todoList.filter(item => !item),
    }));
    this.toggleModal();
  };

  //Modal
  toggleModal = () => {
    this.setState(() => ({
      modalIsOpen: !this.state.modalIsOpen,
    }));
  };
  setErrorMessage = typeOfMsg => {
    const deleteAll = `You are about to delete ALL your todos. This action is
              irreversible! Continue?`;
    const localStorage =
      "An error has ocurred!! Local storage file may be corrupted.";

    this.setState(() => ({
      errorMessage: typeOfMsg === "localStorage" ? localStorage : deleteAll,
    }));
    this.toggleModal();
  };

  render() {
    const {
      addTodoText,
      todoList,
      showAllTodos,
      toggleCheckAll,
      searchFieldValue,
    } = this.state;

    const list = todoList
      .map(item => (
        <Item
          key={item.id}
          todoTitle={item.title}
          isCompleted={item.isCompleted}
          toggleTodoCompleted={() => this.toggleTodoCompleted(item.id)}
          removeTodo={() => this.removeTodo(item.id)}
          editTodo={() => this.editTodo(item.id)}
        />
      ))
      .sort((a, b) => (a.props.isCompleted < b.props.isCompleted ? -1 : 1));
    return (
      <React.Fragment>
        {
          <ShowModal
            todoList={list}
            isOpen={this.state.modalIsOpen}
            closeModal={this.toggleModal}
            errorMessage={this.state.errorMessage}
            boom={this.removeAll}
          ></ShowModal>
        }
        <Inputs
          getTextValue={this.enteredTextHandler}
          addTodoText={addTodoText}
          addTodo={this.addTodo}
          searchItems={this.searchItems}
          isEditing={this.state.isEditing}
          ref={this.state.inputRef}
          error={this.showError}
        />
        <Output
          todoList={list}
          showAllTodos={showAllTodos}
          searchFieldValue={searchFieldValue}
          toggleHideCompleted={this.toggleHideCompleted}
          toggleCheckAll={this.toggleCheckAll}
          toggleCheckAllStatus={toggleCheckAll}
          setErrorMessage={this.setErrorMessage}
        />
      </React.Fragment>
    );
  }
}
