import React from 'react';
import './Goods.scss';

const GoodPreview = require('./GoodPreview.jsx');

class Goods extends React.Component {
  handleFullView(goodId) {
    this.context.router.push(`/goods/${goodId}`);
  }

  render() {

    return (
      <div className='goods'>
        <ul className='goods-list'>
          {
            this.props.goods.map((good)=> {
              return <GoodPreview
                key={good.id}
                title={good.title}
                price={good.price}
                image={good.image}
                description={good.description}
                onMore={() => this.handleFullView(good.id)}
                onAdd={() => this.props.onAdd(good)}
              />;
            })
          }
        </ul>
      </div>
    );
  }
}

Goods.contextTypes = {
  router: React.PropTypes.object.isRequired
}

module.exports = Goods;
