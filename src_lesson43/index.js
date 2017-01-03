/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
var ReactDOM = require('react-dom');
var React = require('react');
import { Router, Route, Redirect, hashHistory } from 'react-router';

import GoodsApp from './GoodsApp.jsx';
import Home from './components/Home.jsx';
import Goods from './components/Goods.jsx';
import Good from './components/Good.jsx';
import Cart from './components/Cart.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Redirect from='/' to='/home' />
    <Route path='/' component={GoodsApp}>
      <Route path='/home' component={Home} />
      <Route path='/goods' component={Goods} />
      <Route path='/goods/:id' component={Good} />
      <Route path='/cart' component={Cart} />
    </Route>
  </Router>,
  document.getElementById('app')
);
