import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

const Timer = React.createClass({
  getInitialState: function() {
    return {
      seconds: 0,
      isPause: false
    };
  },

  componentDidMount: function() {
    this.timer = setInterval(this.tick, 1000);
  },

  tick: function() {
    this.setState({ seconds: this.state.seconds + 1 });
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  pause: function () {
    this.setState({
      isPause: true
    });
    clearInterval(this.timer);
  },

  start: function () {
    this.setState({
      isPause: false
    });
    this.timer = setInterval(this.tick, 1000);
  },

  restart: function() {
    this.setState({
      seconds: 0
    });
  },

  onChange: function (sec) {
    dt = new Date();
    dt.setTime(sec);
    return dt.getUTCHours()+":"+dt.getUTCMinutes()+":"+dt.getUTCSeconds();
  },

  render: function() {
      return (
        <div className="timer">
          <div className="item">
            {this.state.isPause ?
            <button className="btn btn-primary" onClick={this.start}>
              >
            </button> :
            <button className="btn btn-primary" onClick={this.pause}>
              ||
            </button>}
          </div>
          <div className="item">
            <h3>{ Math.floor(this.state.seconds / 3600  % 24) + ' : ' + Math.floor(this.state.seconds / 60 % 60) + ' : ' + this.state.seconds % 60 } </h3>
          </div>
          <div className="item">
            <button className="btn btn-primary" onClick={this.restart}>
              C
            </button>
          </div>
        </div>
      );
    }
});

ReactDOM.render(
  <Timer />,
  document.getElementById('app')
);
