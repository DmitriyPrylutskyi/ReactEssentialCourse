/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react";
import Rows from "./Rows.jsx"
import EditRows from "./EditRows.jsx"

require('./Outcome.scss');

class Outcome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      outcome: []
    }
  }

  componentDidMount () {
    const localOutcome = JSON.parse(localStorage.getItem('outcome'));
    if (localOutcome) {
      this.setState({ income: localOutcome });
    }
  }

  componentDidUpdate () {
    this._updateLocalStorage();
  }

  handleRowAdd (newRow) {
    const newOutcome = this.state.outcome.slice();
    newOutcome.push(newRow);
    this.setState({ outcome: newOutcome });
  }

  handleRowDel () {
    const newRows = this.state.outcome.filter ((row) => {
      return row.isChecked == false;
    });
    this.setState({ outcome: newRows });
  }

  countTotal () {
    let total = 0;
    this.state.outcome.forEach((item, i) => {
      total+= +item.sum
    })
    return total
  }

  handleCheck (row) {
    const rowId = row.id
    const checked = row.isChecked
    const newRows = this.state.outcome.map ((row) => {
      if (row.id == rowId) row.isChecked = checked;
      return row;
    });
    this.setState({ outcome: newRows });
  }

  _updateLocalStorage () {
    const outcome = JSON.stringify(this.state.outcome);
    localStorage.setItem('outcome', outcome);
  }

  render () {
    return (
      <div className="outcome">
        <EditRows
          onRowAdd={(newRow) => this.handleRowAdd(newRow)}
          onRowDel={() => this.handleRowDel()}
        />
        <table cols="4">
          <caption>Outcome table</caption>
          <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Sum</td>
            <td>Date</td>
          </tr>
          </thead>
          <tfoot>
          <tr>
            <td></td>
            <td>Total</td>
            <td>{this.countTotal()}</td>
          </tr>
          </tfoot>
          <Rows income={this.state.outcome} onCheck={(row) => this.handleCheck(row)}/>
        </table>
      </div>
    )
  }
}

module.exports = Outcome
