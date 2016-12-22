/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */
import React from 'react';
import { Link } from 'react-router';

import './components/Articles.scss';

class ArticlesApp extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='menu-bar'>
          <div className='menu-item'>
            <Link className='menu-item-link' to='/articles'>Articles</Link>
          </div>
        </div>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = ArticlesApp;
