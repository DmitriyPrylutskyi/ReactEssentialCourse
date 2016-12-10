import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

class AddTodo extends React.component {
  render () {
    return (
      <div className="todo-add">

      </div>
    );
  }
}

class TodosList extends React.component {
  render () {
    return (
      <div className="todos-list">

      </div>
    );
  }
}

class Filter extends React.component {
  render () {
    return (
      <div className="todos-filter">

      </div>
    );
  }
}

class ToDosApp extends React.component {
  render () {
    return (
      <div className="todos-app">
        {this.props.children}
      </div>
    );
  }
}

React.render (
  <ToDosApp>
      hello
  </ToDosApp>,
  document.getElementById('app')
);
