/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */
import React from 'react';
import { Link } from 'react-router';

const GOODS = require('./goods.json');
import './GoodsApp.scss';

class GoodsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: GOODS,
      cart: []
    };
  }

  handleAddToCart(good) {
    const newCart = this.state.cart.slice();
    if (newCart.indexOf(good) == -1) newCart.push(good);
    this.setState({cart: newCart});
  }

  handleItemDelete (item) {
    const newCart = this.state.cart.slice();
    const index = newCart.indexOf(item);
    newCart.splice(index,1);
    this.setState({cart: newCart});
  }

  render() {
    return (
      <div className='App'>
        <div className='menu-bar'>
          <div className='menu-item'>
            <Link className='menu-item-link' to='/home'>HOME</Link>
          </div>
          <div className='menu-item'>
            <Link className='menu-item-link' to='/goods'>GOODS</Link>
          </div>
          <div className='menu-item'>
            <Link className='menu-item-link' to='/cart'>CART</Link>
          </div>
        </div>
        <div className='content'>
          {this.props.children && React.cloneElement(this.props.children, {
            onAdd: (good) => this.handleAddToCart(good), onDelete: (item) => this.handleItemDelete(item), cart: this.state.cart, goods:this.state.goods
          })}
        </div>
      </div>
    );
  }
}

module.exports = GoodsApp;
