/**
 * Created by Dmitriy Prilutsky on 13.12.2016.
 */
import React from 'react';

import './GoodPreview.scss';

class GoodPreview extends React.Component {
  render() {
    const { title, price, image, description, onMore, onAdd } = this.props;

    return (
      <div className='good-preview'>
        <div className='title'>
          {title}
        </div>
        <img src={image} />
        <div className='price'>
          {price}
        </div>
        <div className='description'>
          {description}
        </div>
        <button className='btn-more' onClick={onMore}>More</button>
        <button className='btn-add-cart' onClick={onAdd}>Add to cart</button>
      </div>
    );
  }
}

module.exports = GoodPreview;
