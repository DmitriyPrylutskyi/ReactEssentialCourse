/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react";

require('./Row.scss');

class Row extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isChecked: this.props.checked
    };
  }

  toggleCheckbox () {
    const id = this.props.id;
    this.setState({
      isChecked: ! this.state.isChecked
    })
    const checkRow = {
      id: id,
      isChecked: ! this.state.isChecked
    };
    this.props.onCheck(checkRow);
  }

  render () {
    const { checked, name, sum, date } = this.props
    return (
      <tr>
        <td>
          <input type="checkbox" defaultChecked={this.state.isChecked} onClick={() => this.toggleCheckbox()}/>
        </td>
        <td>{name}</td>
        <td>{sum}</td>
        <td>{date}</td>
      </tr>
    )
  }
}

module.exports = Row;
