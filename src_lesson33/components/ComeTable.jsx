/**
 * Created by Dmitriy Prilutsky on 18.12.2016.
 */
import React from "react";
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import EditRows from "./EditRows.jsx"
require('./ComeTable.scss');

class ComeTable extends React.Component {
  handleRowAdd(newRow) {
    this.props.onRowAdd(newRow)
  }

  handleRowDel() {
    this.props.onRowDel()
  }

  handleChecked (e, item) {
    this.props.onRowSelection(item.id, e.target.checked);
  }

  countTotal () {
    let total = 0;
    this.props.state.forEach((item, i) => {
      total+= +item.sum
    })
    return total
  }

  formatDate (date) {
    const formatter = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    return formatter.format(new Date(date))
  }

  render () {
    const { title, className, state } = this.props
    return (
      <div className = {className}>
        <h3>{title}</h3>
        <EditRows
          onRowAdd={(newRow) => this.handleRowAdd(newRow)}
          onRowDel={() => this.handleRowDel()}
        />
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{paddingLeft: '46px'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{paddingLeft: '40px'}}>Sum</TableHeaderColumn>
                <TableHeaderColumn style={{paddingLeft: '33px'}}>Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableFooter>
              <TableRow>
                <TableRowColumn style={{paddingLeft: '46px', fontWeight: 'bold'}}>Total</TableRowColumn>
                <TableRowColumn style={{paddingLeft: '40px', fontWeight: 'bold'}}>{(Math.round(this.countTotal()*100)/100).toFixed(2)}</TableRowColumn>
                <TableRowColumn></TableRowColumn>
              </TableRow>
            </TableFooter>
            <TableBody displayRowCheckbox={false}>
              {
                state.map((item)=> {
                  return (
                    <TableRow key = {item.id}>
                      <TableRowColumn style={{width: '70px'}}>
                        <Checkbox onCheck={(e) =>this.handleChecked(e, item)}></Checkbox>
                      </TableRowColumn>
                      <TableRowColumn>{item.name}</TableRowColumn>
                      <TableRowColumn>{(Math.round(item.sum*100)/100).toFixed(2)}</TableRowColumn>
                      <TableRowColumn>{this.formatDate(item.id)}</TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}

module.exports = ComeTable
