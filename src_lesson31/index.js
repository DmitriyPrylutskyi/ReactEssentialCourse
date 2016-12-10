/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
var ReactDOM = require('react-dom');
var React = require('react');
var ContactsApp = require('./components/ContactsApp.jsx');

ReactDOM.render(
  <ContactsApp />,
  document.getElementById('app')
);

