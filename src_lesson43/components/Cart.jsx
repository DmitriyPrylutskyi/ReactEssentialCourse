import React from 'react';

import './Cart.scss';

const CartItem = require('./CartItem.jsx');

class Cart extends React.Component {
  render () {
    return (
      <div className='cart'>
        {
          this.props.cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                onDelete={() => this.props.onDelete(item)}
                title={item.title}
                price={item.price}>
              </CartItem>
            );
          })
        }
      </div>
    )
  }
}

module.exports = Cart;

