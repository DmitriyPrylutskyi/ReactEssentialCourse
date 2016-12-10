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
      <div className="calc">
        <div>
          <input type="text" placeholder="Enter number..." className="form-control" ref="a"/>
          <input type="text" placeholder="Enter number..." className="form-control" ref="b"/>
        </div>
        <div>
          <button className="btn btn-primary" onClick={this.handleTotal}>
            +
          </button>
          <button className="btn btn-primary" onClick={this.handleTotal}>
            -
          </button>
          <button className="btn btn-primary" onClick={this.handleTotal}>
            *
          </button>
          <button className="btn btn-primary" onClick={this.handleTotal}>
            /
          </button>
        </div>
        <h3><span className="label label-info">Итог: {this.state.total}</span></h3>
      </div>
      )
  }
});

ReactDOM.render(
  <Calc/>,
  document.getElementById('app')
);
