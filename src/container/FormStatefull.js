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
    text: "",
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
    //if (localStorage < 0)
    this.setState({
      todoList: JSON.parse(localStorage.getItem("myData")),
      showAllTodos: JSON.parse(localStorage.getItem("showAllTodos"))
    });
  }

  componentDidUpdate() {
    const {
      text,
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
      text,
      todoList,
      showAllTodos,
      "isEditing:",
      isEditing,
      "searching:",
      searching,
      searchFieldValue.length
    );
  }

  //addTodo searchbar
  focusAddTodoField = () => this.state.inputRef.current.focus();
  textHandler = e => {
    console.log("texthandler");
    const name = e.target.name.toLowerCase();
    const value = e.target.value;
    this.setState(() => ({
      [name]: value
    }));
  };
  addTodo = e => {
    e.preventDefault();
    const { text, todoList } = this.state;
    const validText = text.trim();

    if (!text.trim()) {
      return;
    }
    const newItem = {
      id: uuid(),
      title: `${validText[0].toUpperCase() + validText.substring(1)}  `,
      isCompleted: false
    };
    this.setState({
      todoList: [...todoList, newItem],
      text: "",
      isEditing: false
    });
  };

  //SEARCH BAR
  searchItems = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Toggle Options
  toggleCheckAll = () => {
    const { todoList, toggleCheckAll } = this.state;
    console.log(toggleCheckAll);
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
    if (this.state.isEditing) {
      return;
    }
    const item = this.state.todoList.filter(item => item.id === id);

    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id),
      text: item[0].title
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
      text,
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
          text={text}
          getAddTodoTextValue={this.textHandler}
          addTodo={this.addTodo}
          searchItems={this.searchItems}
          isEditing={this.state.editing}
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
