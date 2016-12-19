/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

require('./EditRows.scss');

class EditRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      sum: 0,
      error: ''
    };
  }

  handleFormSubmit () {
    if (this.refs.name.getValue() != '' && this.refs.sum.getValue() !='') {
      this.setState({ error: ''})
      this.setState({open: false})
      const newRow = {
        id: Date.now(),
        name: this.state.name,
        sum: this.state.sum,
      };
      this.props.onRowAdd(newRow);
    }
    else {this.setState({ error: 'Required'})}
  }

  handleTextChange () {
    this.setState({ name: this.refs.name.getValue() })
    this.setState({ sum: this.refs.sum.getValue() })
    if (this.refs.name.getValue() !='' && this.refs.sum.getValue() !='')  this.setState({ error: ''})
  }

  handleRowDel () {
    this.props.onRowDel();
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        onTouchTap={() => this.handleFormSubmit()}
      />,
    ];
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className='editrows'>
          <RaisedButton label='Add new row' style={{margin: '20px', width: '180px'}} className='add-button' onTouchTap={() => this.handleOpen()} />
          <RaisedButton label='Delete selected' secondary={true} style={{margin: '20px', width: '180px'}} className='del-button' onClick={() => this.handleRowDel()} />
          <Dialog
            title='Add income / outcome'
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField
              type='text'
              hintText='Name'
              className='name-field'
              ref='name'
              required
              onChange={() => this.handleTextChange()}
              style={{marginRight: '20px'}}
            />
            <TextField
              type='number'
              step='0.01'
              hintText='00.00'
              className='sum-field'
              ref='sum'
              required
              onChange={() => this.handleTextChange()}
              style={{marginRight: '20px'}}
            />
            <p style={{display: 'inline-block', width: '50px', color: 'red'}}>{this.state.error}</p>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = EditRows;
