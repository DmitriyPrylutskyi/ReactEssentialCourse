/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
var ReactDOM = require('react-dom');
var React = require('react');
import { Router, Route, hashHistory } from 'react-router';

import ArticlesApp from './ArticlesApp.jsx';
import Articles from './components/Articles.jsx';
import Article from './components/Article.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={ArticlesApp}>
      <Route path='/articles' component={Articles}>
        <Route path='/articles/:articleId' component={Article} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
