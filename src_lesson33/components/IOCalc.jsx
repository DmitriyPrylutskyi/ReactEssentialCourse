/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react";

import Income from "./Income.jsx"
import Outcome from "./Outcome.jsx"

require('./IOCalc.scss');

class IOCalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="app">
        <Income/>
        <Outcome/>
      </div>
    );
  }
}

module.exports = IOCalcApp;

