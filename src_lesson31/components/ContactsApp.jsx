import React from "react";

require('./ContactsApp.scss');

const Contact = require('./Contact.jsx')

const CONTACTS = [
  {
    id: 1,
    name: 'Darth Vader',
    phoneNumber: '+250966666666',
    image: 'img/darth.gif',
    address: '132113213',
    email: 'fefef@jlfdj.dfdf',
  }, {
    id: 2,
    name: 'Princess Leia',
    phoneNumber: '+250966344466',
    image: 'img/leia.gif',
    address: '132113213',
    email: 'fefef@jlfdj.dfdf',
  }, {
    id: 3,
    name: 'Luke Skywalker',
    phoneNumber: '+250976654433',
    image: 'img/luke.gif',
    address: '132113213',
    email: 'fefef@jlfdj.dfdf',
  }, {
    id: 4,
    name: 'Chewbacca',
    phoneNumber: '+250456784935',
    image: 'img/chewbacca.gif',
    address: '132113213',
    email: 'fefef@jlfdj.dfdf',
  }
];

class ContactsApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      contacts: CONTACTS
    };
  }

  handleSearch (event) {
    const searchQuery = event.target.value.toLowerCase();
    const contacts = CONTACTS.filter((el) =>{
        const searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });
      this.setState({
      contacts: contacts
    });
  }

  render() {
    return (
      <div className="contacts">
      <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch.bind(this)} />
      <ul className="contacts-list">
          {
            this.state.contacts.map(function(el) {
              return <Contact
                key={el.id}
                name={el.name}
                phoneNumber={el.phoneNumber}
                image={el.image}
                address={el.address}
                email={el.email}
              />;
            })
          }
      </ul>
      </div>
    );
  }
}

module.exports = ContactsApp;
