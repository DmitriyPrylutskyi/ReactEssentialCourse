/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */
import React from 'react';

require('./Note.scss');

class Note extends React.Component {
  render() {
    const style = { backgroundColor: this.props.color };
    return (
      <div className='note' style={style}>
        <span className='delete-note' onClick={this.props.onDelete}> × </span>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Note
