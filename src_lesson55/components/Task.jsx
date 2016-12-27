import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import ActionExtra from 'material-ui/svg-icons/editor/insert-comment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

require ('./Task.less');

const ENTER_KEY = 13;
const ESC_KEY = 27;

const Task = React.createClass({
    getInitialState() {
        return {
            due:  this.props.date,
            isEditing: false,
            isExpanded: false,
        };
    },

    formatDate (date) {
      const formatter = new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
      return formatter.format(new Date(date))
    },

    handleExpand(){
        const isExpanded = this.state.isExpanded
        this.setState({isExpanded:!isExpanded})
    },

    handleEdit() {
        this.setState({ isEditing: true }, this.focusInput);
    },

    handleDelete() {
      this.props.onDelete();
    },

    handleCancel() {
        this.cancelTask();
    },

    handleSave() {
        this.saveTask();
    },

    handleCheck() {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    },

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelTask();
        }
    },

    focusInput() {
        this.input.focus();
    },

    handleDateChange(event, date) {
        this.setState({
            due:date
        });
    },

    saveTask() {
        this.props.onUpdate({ text: this.input.value, notes:this.desc.value, due:this.state.due });
        this.setState({ isEditing: false });
    },

    cancelTask() {
        this.setState({ isEditing: false });
    },

    render() {
        return (
            this.state.isEditing
            ?
              <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className='Task editing'>
                    <input
                        className='Task__input'
                        type='text'
                        defaultValue={this.props.text}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.input = c}
                    />
                    <input
                        className='Task__input'
                        type='text'
                        defaultValue={this.props.notes}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.desc = c}
                    />
                    <div>
                        <DatePicker
                            className='Task__date'
                            value={this.state.due}
                            defaultValue={this.props.date}
                            onChange={this.handleDateChange}
                            ref='myDatePicker'
                            hintText='Portrait Dialog'/>
                    </div>
                    <div className='Task__toolbar'>
                        <div>
                            <RaisedButton primary onClick={this.handleSave} label='Save' style={{marginRight: '20px'}} />
                            <RaisedButton secondary onClick={this.handleDelete} label='Delete' style={{marginRight: '20px'}}/>
                            <FlatButton onClick={this.handleCancel} label='Cancel' />
                        </div>
                    </div>
                </div>
              </MuiThemeProvider>
            :
              <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className='Task'>
                    <Checkbox
                        className='Task__checkbox'
                        checked={this.props.isCompleted}
                        onCheck={this.handleCheck}
                    />

                    <div className='Task__text'>
                        <div className='Task__title'>
                            {this.props.text}
                            {!(this.props.notes || this.state.due) ?
                                  <div></div>
                                  :
                                  <div>
                                  <span>
                                      <ActionExtra className='Task__note' onClick={this.handleExpand}/>
                                  </span>
                                    {
                                        this.state.isExpanded ?
                                        <div className='Task__extra'>
                                        {this.props.notes ? <small>Notes :{this.props.notes}</small> : <div></div>}
                                        {this.state.due ? <small> Due :{this.formatDate(this.state.due)}</small> : <div></div>}
                                        </div>
                                        :
                                        <div></div>
                                    }
                                  </div>
                            }
                        </div>
                    </div>
                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                    </IconMenu>
                </div>
              </MuiThemeProvider>
        );
    }
});

export default Task;
