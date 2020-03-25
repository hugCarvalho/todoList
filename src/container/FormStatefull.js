import React, { Component } from "react";
import Item from "../components/Item/Item";
import { v4 as uuid } from "uuid";
import Inputs from "../components/Inputs/Inputs";
import Output from "../components/Output/Output";

//2 localstorages
// loading
// saving

export default class FormStatefull extends Component {
  state = {
    items: [],
    text: "",
    searchField: "",
    showAll: true,
    toggleAll: true,
    editing: false,
    todoB: false,
    //searching: true
    inputRef: React.createRef()
  };

  componentDidMount() {
    console.log("MOUNT");
    this.focusMe();
    this.setState({
      items: JSON.parse(localStorage.getItem("myData"))
    });
  }
  //

  componentDidUpdate() {
    const {
      text,
      items,
      showAll,
      editing,
      searching,
      searchField
    } = this.state;
    const data = JSON.stringify(items);

    localStorage.setItem("myData", data);
    console.log(
      "UPDATE",
      text,
      items,
      showAll,
      "editing:",
      editing,
      "searching:",
      searching,
      searchField.length
    );
  }

  //Affects ADD searchbar
  focusMe = () => this.state.inputRef.current.focus();

  textHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({
      [name]: value
    }));
  };

  add = e => {
    e.preventDefault();
    const { text, items } = this.state;
    const newItem = {
      id: uuid(),
      title: text[0].toUpperCase().concat(text.substring(1)),
      completed: false
    };
    if (!text.trim()) {
      return alert("Please give your todo a title or description ");
    }
    this.setState({
      items: [...items, newItem],
      text: "",
      editing: false
    });
    console.log("ADD");
  };

  //Afects SEARCH BAR
  searchItems = e => this.setState({ [e.target.name]: e.target.value });
  //Afects ITEMS MENU
  toggleAll = () => {
    const { items, toggleAll } = this.state;
    console.log(toggleAll);
    this.setState({
      items: items.map(item => {
        toggleAll ? (item.completed = true) : (item.completed = false);
        return item;
      })
    });
    this.setState(() => ({ toggleAll: !toggleAll }));
  };

  hide = () => this.setState(() => ({ showAll: !this.state.showAll }));

  removeAll = () => {
    const { items } = this.state;
    if (!items.length) {
      return alert("List is already empty. Try add some todos cowboy...");
    }
    if (
      prompt(
        "WARNING! You are about to delete ALL your todos. This action is irreversible. Are you sure?"
      ) !== null
    ) {
      return this.setState(() => ({ items: [] }));
    }
    return;
  };
  //Afects ITEMS
  toggle = id => {
    const { items } = this.state;
    this.setState({
      items: items.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    });
  };

  edit = id => {
    const item = this.state.items.filter(item => item.id === id);
    this.setState({
      items: this.state.items.filter(item => item.id !== id),
      text: item[0].title
    });
    this.setState(() => ({ editing: !this.state.editing }));
    this.focusMe();
  };

  remove = id =>
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    });

  render() {
    const { text, items, showAll, toggleAll, searchField } = this.state;
    //RENDER!
    console.log("render");
    const list = items
      .map(item => (
        <Item
          key={item.id}
          title={item.title}
          completed={item.completed}
          toggle={() => this.toggle(item.id)}
          remove={() => this.remove(item.id)}
          edit={() => this.edit(item.id)}
        />
      ))
      .sort((a, b) => (a.props.completed < b.props.completed ? -1 : 1));
    const filteredList = list.filter(item => {
      return item.props.title.includes(searchField);
    });
    //console.log(filteredList);
    return (
      <React.Fragment>
        <Inputs
          searchItems={this.searchItems}
          textValue={this.textHandler}
          add={this.add}
          text={text}
          editing={this.state.editing}
          ref={this.state.inputRef}
        />
        <Output
          list={filteredList}
          showAll={showAll}
          hide={this.hide}
          remove={this.remove}
          toggleAll={this.toggleAll}
          toggleAllStatus={toggleAll}
          searchItems={this.searchItems}
          edit={this.edit}
          boom={this.removeAll}
        />
      </React.Fragment>
    );
  }
}
