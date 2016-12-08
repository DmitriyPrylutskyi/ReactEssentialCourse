import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

const Input = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  handleEnter: function(event) {
    const text = event.target.value;
    this.setState({
      text: text
    });
  },

  render: function() {
    return (
      <div className="input">
        <input type="text" placeholder="Enter text..." className="enter-field" onChange={this.handleEnter} />
        <p>Hello, {this.state.text || 'stranger'}</p>
      </div>
      )
  }
});

ReactDOM.render(
  <Input/>,
  document.getElementById('app')
);
