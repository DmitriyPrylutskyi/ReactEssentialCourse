/**
 * Created by Dmitriy Prilutsky on 13.12.2016.
 */
import React from 'react';

import './ArticlePreview.scss';

class ArticlePreview extends React.Component {
  render() {
    const { title, author, selected, onClick } = this.props;

    return (
      <div className={'article-preview' + (selected ? ' selected' : '')} onClick={onClick}>
        <div className='title'>
          {title}
        </div>

        <div className='author'>
          {author}
        </div>
      </div>
    );
  }
}

module.exports = ArticlePreview;
