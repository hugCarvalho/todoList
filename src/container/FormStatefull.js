import React, { Component } from "react";
import Item from "../components/Item/Item";
import { v4 as uuid } from "uuid";
import Inputs from "../components/Inputs/Inputs";
import Output from "../components/Output/Output";
import ShowModal from "../components/Modal/ShowModal";

//TODO: set condition for localstorage first time

export default class FormStatefull extends Component {
  state = {
    todoList: [],
    addTodoText: "",
    searchFieldValue: "",
    showAllTodos: false,
    toggleCheckAll: false,
    isEditing: false,
    todoB: false,
    modalIsOpen: false,
    inputRef: React.createRef()
  };

  componentDidMount() {
    this.focusAddTodoField();
    if (localStorage.myData) {
      this.setState({
        todoList: JSON.parse(localStorage.getItem("myData")),
        showAllTodos: JSON.parse(localStorage.getItem("showAllTodos"))
      });
    }
  }
  componentDidUpdate() {
    const {
      addTodoText,
      todoList,
      showAllTodos,
      isEditing,
      searching,
      searchFieldValue
    } = this.state;

    const todosData = JSON.stringify(todoList);

    //Optionally create an object for all...
    localStorage.setItem("myData", todosData);
    localStorage.setItem("showAllTodos", JSON.stringify(showAllTodos));

    console.log("local", showAllTodos);
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
      searchFieldValue.length
    );
  }
  //Gets typed text for add+search fields
  enteredTextHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({
      [name]: value
    }));
  };
  //AddTodo searchbar
  focusAddTodoField = () => this.state.inputRef.current.focus();

  addTodo = e => {
    const { addTodoText, todoList } = this.state;
    const validText = addTodoText.trim();
    const newItem = {
      id: uuid(),
      title: `${validText[0].toUpperCase() + validText.substring(1)}  `,
      isCompleted: false
    };

    e.preventDefault();
    if (!addTodoText.trim()) {
      return;
    }
    this.setState({
      todoList: [...todoList, newItem],
      addTodoText: "",
      isEditing: false
    });
  };

  //Toggle Options
  toggleCheckAll = () => {
    const { todoList, toggleCheckAll } = this.state;
    this.setState({
      todoList: todoList.map(item => {
        toggleCheckAll ? (item.isCompleted = true) : (item.isCompleted = false);
        return item;
      })
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
      })
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
      addTodoText: todo[0].title.trim()
    });
    this.setState(() => ({ isEditing: !this.state.isEditing }));
    this.focusAddTodoField();
  };

  removeTodo = id =>
    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id)
    });

  removeAll = () => {
    this.closeModal();
    this.setState(() => ({ todoList: [] }));
  };

  openModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  toggleModal = () => {
    this.setState(() => ({
      isModalOpen: !this.state.isModalOpen
    }));
  };

  //Render
  render() {
    const {
      addTodoText,
      todoList,
      showAllTodos,
      toggleCheckAll,
      searchFieldValue
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

    const filteredList = list.filter(item => {
      return item.props.todoTitle
        .toLowerCase()
        .includes(searchFieldValue.toLowerCase());
    });
    //console.log(filteredList);
    return (
      <React.Fragment>
        {
          <ShowModal
            isOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            boom={this.removeAll}
            list={todoList}
          ></ShowModal>
        }
        <Inputs
          addTodoText={addTodoText}
          getTextValue={this.enteredTextHandler}
          addTodo={this.addTodo}
          searchItems={this.searchItems}
          isEditing={this.state.isEditing}
          ref={this.state.inputRef}
        />
        <Output
          list={filteredList}
          showAllTodos={showAllTodos}
          toggleHideCompleted={this.toggleHideCompleted}
          toggleCheckAll={this.toggleCheckAll}
          toggleCheckAllStatus={toggleCheckAll}
          openModal={this.openModal}
        />
      </React.Fragment>
    );
  }
}
