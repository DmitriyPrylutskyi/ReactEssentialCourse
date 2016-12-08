import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

const Calc = React.createClass({
  getInitialState: function() {
    return {
      total: ''
    };
  },

  handleTotal(event) {
    const a = +this.refs.a.value.trim();
    const b = +this.refs.b.value.trim();
    let total;
    if (a && b ) {
      switch (event.target.innerHTML) {
        case ('+'):
          total = a + b;
          break;
        case ('-'):
          total = a - b;
          break;
        case ('*'):
          total = a * b;
          break;
        case ('/'):
          total = a / b;
          break;
      }
      this.setState({
        total: total
      });
    }
  },

  render: function() {
    return (
      <div className="input">
        <input type="text" placeholder="Enter number..." className="enter-field" ref="a"/>
        <input type="text" placeholder="Enter number..." className="enter-field" ref="b"/>
        <div>
          <button onClick={this.handleTotal}>
            +
          </button>
          <button onClick={this.handleTotal}>
            -
          </button>
          <button onClick={this.handleTotal}>
            *
          </button>
          <button onClick={this.handleTotal}>
            /
          </button>
        </div>
        <p>Итог: {this.state.total}</p>
      </div>
      )
  }
});

ReactDOM.render(
  <Calc/>,
  document.getElementById('app')
);
