/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */

var ReactDOM = require('react-dom');
var React = require('react');
var NotesApp = require('./components/NotesApp.jsx');

ReactDOM.render(
  <NotesApp />,
  document.getElementById('app')
);
