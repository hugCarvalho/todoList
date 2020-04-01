import React, { Component } from "react";
import Item from "../components/Item/Item";
import { v4 as uuid } from "uuid";
import Inputs from "../components/Inputs/Inputs";
import Output from "../components/Output/Output";
import ShowModal from "../components/Modal/ShowModal";

//TODO: set condition for localstorage first time

export default class FormStatefull extends Component {
  state = {
    items: [],
    text: "",
    searchFieldValue: "",
    showAllTodos: true,
    toggleCheckAll: true,
    isEditing: false,
    todoB: false,
    //searching: true
    inputRef: React.createRef(),
    modalIsOpen: false
  };

  componentDidMount() {
    console.log(localStorage.length);
    this.focusMe();
    //if (localStorage < 0)
    this.setState({
      items: JSON.parse(localStorage.getItem("myData"))
    });
  }

  componentDidUpdate() {
    const {
      text,
      items,
      showAllTodos,
      isEditing,
      searching,
      searchFieldValue
    } = this.state;
    const data = JSON.stringify(items);

    localStorage.setItem("myData", data);
    console.log(
      "UPDATE",
      text,
      items,
      showAllTodos,
      "isEditing:",
      isEditing,
      "searching:",
      searching,
      searchFieldValue.length
    );
  }

  //addTodo searchbar
  focusMe = () => this.state.inputRef.current.focus();
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
    const { text, items } = this.state;
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
      items: [...items, newItem],
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

  //ITEMS MENU
  toggleCheckAll = () => {
    const { items, toggleCheckAll } = this.state;
    console.log(toggleCheckAll);
    this.setState({
      items: items.map(item => {
        toggleCheckAll ? (item.isCompleted = true) : (item.isCompleted = false);
        return item;
      })
    });
    this.setState(() => ({ toggleCheckAll: !toggleCheckAll }));
  };

  toggleHideCompleted = () =>
    this.setState(() => ({ showAllTodos: !this.state.showAllTodos }));

  //Afects ITEMS
  toggleTodoCompleted = id => {
    const { items } = this.state;
    this.setState({
      items: items.map(item => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
    });
  };
  //editTodo
  editTodo = id => {
    if (this.state.isEditing) {
      return;
    }
    const item = this.state.items.filter(item => item.id === id);

    this.setState({
      items: this.state.items.filter(item => item.id !== id),
      text: item[0].title
    });
    this.setState(() => ({ isEditing: !this.state.isEditing }));
    this.focusMe();
  };

  removeTodo = id =>
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    });

  removeAll = () => {
    //const { items } = this.state;
    // this.setState(() => ({ modalIsOpen: true }));

    // if (!items.length) {
    //   return "List is already empty. Try add some todos cowboy...";
    // }
    // if (
    //   prompt(
    //     "WARNING! You are about to delete ALL your todos. This action is irreversible. Are you sure?"
    //   ) !== null
    // ) {
    this.closeModal();
    this.setState(() => ({ items: [] }));
    // }
    // return;
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  toggleModal = () => {
    this.setState(() => ({
      isModalOpen: !this.state.isModalOpen
    }));
  };
  message = () => {
    return "why";
  };
  render() {
    const {
      text,
      items,
      showAllTodos,
      toggleCheckAll,
      searchFieldValue
    } = this.state;
    //RENDER!
    const list = items
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
            list={items}
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
