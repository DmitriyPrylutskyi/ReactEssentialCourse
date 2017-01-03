import React from 'react';
import './CartItem.scss';

class CartItem extends React.Component {
  render () {
    return (
      <div className='cart-item'>
        <span className='title-item'> {this.props.title} </span>
        <span className='title-price'> {this.props.price} </span>
        <span className='delete-item' onClick={this.props.onDelete}> × </span>
      </div>
    )
  }
}

module.exports = CartItem;

