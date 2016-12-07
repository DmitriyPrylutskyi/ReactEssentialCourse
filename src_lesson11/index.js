import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
/*import { Provider } from "react-redux";
import { connect } from "react-redux";
import { createStore } from "redux";*/
import "./stylesheets/main.scss";
//import { router } from "./router.js";

const CONTACTS = [
  {
    id: 1,
    name: 'Darth Vader',
    phoneNumber: '+250966666666',
    image: 'img/darth.gif'
  }, {
    id: 2,
    name: 'Princess Leia',
    phoneNumber: '+250966344466',
    image: 'img/leia.gif'
  }, {
    id: 3,
    name: 'Luke Skywalker',
    phoneNumber: '+250976654433',
    image: 'img/luke.gif'
  }, {
    id: 4,
    name: 'Chewbacca',
    phoneNumber: '+250456784935',
    image: 'img/chewbacca.gif'
  }
];

const Contact = React.createClass({
  render: function() {
    return (
      <li className="contact">
      <img className="contact-image" src={this.props.image} width="60px" height="60px" />
      <div className="contact-info">
      <div className="contact-name"> {this.props.name} </div>
      <div className="contact-number"> {this.props.phoneNumber} </div>
      </div>
      </li>
      )
  }
});

const ContactsList = React.createClass({
  getInitialState: function() {
    return {
      displayedContacts: CONTACTS
    };
  },

  handleSearch: function(event) {
    const searchQuery = event.target.value.toLowerCase();
    const displayedContacts = CONTACTS.filter(function(el) {
        const searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });

      this.setState({
      displayedContacts: displayedContacts
    });
  },

  render: function() {
  return (
    <div className="contacts">
    <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch} />
    <ul className="contacts-list">
    {
      this.state.displayedContacts.map(function(el) {
        return <Contact
          key={el.id}
          name={el.name}
          phoneNumber={el.phoneNumber}
          image={el.image}
        />;
      })
    }
    </ul>
    </div>
  );
  }
});

ReactDOM.render(
  <ContactsList />,
  document.getElementById('app')
);
