/**
 * Created by Dmitriy Prilutsky on 11.12.2016.
 */
import React from 'react';
import'./Good.scss';

class Good extends React.Component {
  constructor(props) {
    super(props);
    const goodId  = this.props.params.id;
    this.state = {
      good: this.props.goods.find(good => (good.id === goodId))
    }
  }

  render () {
    const {good} = this.state;
    return (
      <div className='good'>
          <div className='good-title'> {good.title} </div>
          <div className='good-image'> <img src={good.image} /> </div>
          <div className='good-description'> {good.description} </div>
          <div className='good-price'> {good.price} </div>
          <div className='good-all-desc'> {good.allDesc} </div>
      </div>
    )
  }
}

module.exports = Good;
