/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */
import React from 'react';

require('./ColorNote.scss');

const COLORNOTE = [
  {
    id: 1,
    color: 'yellow',
  },
  {
    id: 2,
    color: 'blue',
  },
  {
    id: 3,
    color: 'green',
  },
  {
    id: 4,
    color: 'red',
  },
  {
    id: 5,
    color: 'gray',
  },
];

class ColorNote extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      colorNote: COLORNOTE,
      selectedOption: '1',
    }
  }

  colorChange (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
    this.props.onColorChange(this.state.colorNote[changeEvent.target.value-1].color);
  }

  render () {
    const that = this;
    return (
      <fieldset>
        {this.state.colorNote.map((radio) => {
          return (
            <label className={'colors' +  (that.state.selectedOption == radio.id ? ' checked': '')} style={{backgroundColor : radio.color}}
                   key = {radio.id}
            >
              <input type='radio' className='radio'
                     value={radio.id}
                     checked={that.state.selectedOption == radio.id}
                     onChange={(e)=>that.colorChange(e)} />
            </label>
          )
        })
        }
      </fieldset>
    )
  }
}

module.exports = ColorNote;
