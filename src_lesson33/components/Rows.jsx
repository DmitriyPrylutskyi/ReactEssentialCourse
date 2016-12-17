/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react";
import Row from "./Row.jsx"

require('./Rows.scss');

class Rows extends React.Component {
  handleCheck (row) {
    this.props.onCheck(row)
  }

  render () {
    return (
      <tbody>
      {this.props.income.map((item)=> {
        return (
          <Row
            key = {item.id}
            id = {item.id}
            checked = {item.isChecked}
            name = {item.name}
            sum = {item.sum}
            date = {new Date(item.id).toLocaleString()}
            onCheck={(row) => this.handleCheck(row)}>
          </Row>
        )
      })}
      </tbody>
    )
  }
}

module.exports = Rows;
