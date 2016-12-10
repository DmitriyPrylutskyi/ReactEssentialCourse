/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
import React from "react";

require('./Contact.scss');

class Contact extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  expandContact (event) {
    this.setState({
      expand: !this.state.expand
    });
  }

  render () {
    return (
    <li className="contact" onClick={this.expandContact.bind(this)}>
    <img className="contact-image" src={this.props.image} width="60px" height="60px" />
    <div className="contact-info">
      <div className="contact-name"> {this.props.name} </div>
      <div className="contact-number">Phone: {this.props.phoneNumber} </div>
      <div className={'contact-address' + (this.state.expand ? '' : ' expand')}> Address: {this.props.address} </div>
      <div className={'contact-email' + (this.state.expand ? '' : ' expand')}>E-mail: {this.props.email} </div>
    </div>
    </li>
    )
  }
}

module.exports = Contact;
