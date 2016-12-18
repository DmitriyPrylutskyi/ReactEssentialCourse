/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
var ReactDOM = require('react-dom');
var React = require('react');

var IOCalcApp = require('./components/IOCalc.jsx');

ReactDOM.render(
  <IOCalcApp />,
  document.getElementById('app')
);

