/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react";
import Rows from "./Rows.jsx"
import EditRows from "./EditRows.jsx"

require('./Income.scss');

class Income extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      income: []
    }
  }

  componentDidMount () {
    const localIncome = JSON.parse(localStorage.getItem('income'));
    if (localIncome) {
      this.setState({ income: localIncome });
    }
  }

  componentDidUpdate () {
    this._updateLocalStorage();
  }

  handleRowAdd (newRow) {
    const newIncome = this.state.income.slice();
    newIncome.push(newRow);
    this.setState({ income: newIncome });
  }

  handleRowDel () {
    const newRows = this.state.income.filter ((row) => {
      return row.isChecked == false;
    });
    this.setState({ income: newRows });
  }

  countTotal () {
    let total = 0;
    this.state.income.forEach((item, i) => {
      total+= +item.sum
    })
    return total
  }

  handleCheck (row) {
    const rowId = row.id
    const checked = row.isChecked
    const newRows = this.state.income.map ((row) => {
      if (row.id == rowId) row.isChecked = checked;
      return row;
    });
    this.setState({ income: newRows });
  }

  _updateLocalStorage () {
    const income = JSON.stringify(this.state.income);
    localStorage.setItem('income', income);
  }

  render () {
    return (
        <div className="income">
          <EditRows
            onRowAdd={(newRow) => this.handleRowAdd(newRow)}
            onRowDel={() => this.handleRowDel()}
          />
          <table cols="4">
            <caption>Income table</caption>
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
            <Rows income={this.state.income} onCheck={(row) => this.handleCheck(row)}/>
          </table>
        </div>
    )
  }
}

module.exports = Income
