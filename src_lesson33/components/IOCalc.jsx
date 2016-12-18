/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react"
import injectTapEventPlugin from 'react-tap-event-plugin'

import MyAppBar from "./MyAppBar.jsx"
import ComeTable from "./ComeTable.jsx"

require('./IOCalc.scss')

injectTapEventPlugin()

class IOCalcApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      income: [],
      incomeChecked: [],
      outcome: [],
      outcomeChecked: []
    }
  }

  componentDidMount () {
    const localIncome = JSON.parse(localStorage.getItem('income'))
    if (localIncome) {
      this.setState({ income: localIncome })
    }
    const localOutcome = JSON.parse(localStorage.getItem('outcome'))
    if (localOutcome) {
      this.setState({ outcome: localOutcome })
    }
  }

  componentDidUpdate () {
    this.updateLocalStorage(this.state.income, 'income')
    this.updateLocalStorage(this.state.outcome, 'outcome')
  }

  handleRowSelection (rowId, checked, state, name) {
    console.log(rowId, checked, state, name)
    let newChecked = state.slice()
    if (checked) {newChecked.push(rowId)}
      else {
        newChecked = state.filter((item) => {
          return item != rowId
      })
    }
    if (name == 'income' )
      this.setState({ incomeChecked : newChecked })
        else this.setState({ outcomeChecked : newChecked })
  }

  handleRowAdd (newRow, state, name) {
    const newTable = state.slice()
    newTable.push(newRow)
    if (name == 'income' )
      this.setState({ income : newTable })
        else this.setState({ outcome : newTable })
  }

  handleRowDel (state, statecheked, name) {
    console.log(state, statecheked, name)
    let newRows = state
    statecheked.forEach((item, i) => {
      newRows = newRows.filter ((row) => {
        return row.id !== item;
      })
    })
    if (name == 'income' )
      this.setState({ income : newRows })
        else this.setState({ outcome : newRows })
  }

  updateLocalStorage (state, name) {
    const newTable = JSON.stringify(state)
    localStorage.setItem( name, newTable )
  }

  render() {
    return (
      <div className="app">
        <MyAppBar/>
        <ComeTable
          title='Income table'
          className='income'
          state={this.state.income}
          onRowAdd={(newRow) => this.handleRowAdd(newRow,  this.state.income, 'income')}
          onRowDel={() => this.handleRowDel(this.state.income, this.state.incomeChecked, 'income')}
          onRowSelection={(rowId, checked) => this.handleRowSelection(rowId, checked, this.state.incomeChecked, 'income')}/>
        <ComeTable
          title='Outcome table'
          className='outcome'
          state={this.state.outcome}
          onRowAdd={(newRow) => this.handleRowAdd(newRow,  this.state.outcome, 'outcome')}
          onRowDel={() => this.handleRowDel(this.state.outcome, this.state.outcomeChecked, 'outcome')}
          onRowSelection={(rowId, checked) => this.handleRowSelection(rowId, checked, this.state.outcomeChecked, 'outcome')}/>
      </div>
    );
  }
}

module.exports = IOCalcApp
