import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const TaskCreateModal = React.createClass({
    getInitialState() {
        return {
            text : '',
            notes :'',
            due : ''
        };
    },

    handleClose() {
        const { onClose } = this.props;

        this.setState({ text: '', notes : '', due: ''  });

        if (onClose) {
            onClose();
        }
    },

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                text: this.state.text,
                notes: this.state.notes,
                due: this.state.due
            });
        }

      this.setState({ text: '', notes : '', due: ''  });
    },

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    },

    handleNotesChange(e) {
      this.setState({
        notes: e.target.value
      });
    },

    handleDateChange(event, date) {
      console.log(date)
      this.setState({
        due :date
      });
    },

    render() {
        const { text, notes } = this.state;
        const { isOpen } = this.props;

        return (
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Dialog
                className='TaskCreateModal'
                contentStyle={{ maxWidth: 400 }}
                actions={[
                    <FlatButton
                        label='Cancel'
                        onTouchTap={this.handleClose}
                    />,
                    <FlatButton
                        primary
                        label='Submit'
                        disabled={!text}
                        onTouchTap={this.handleSubmit}
                    />
                ]}
                open={isOpen}
                onRequestClose={this.handleClose}
            >
                <h3 className='TaskCreateModal__modal-title'>Add task</h3>
                <TextField
                    fullWidth
                    ref={c => this.taskInput = c}
                    value={text}
                    onChange={this.handleTextChange}
                    hintText='e.g. buy a bottle of milk'
                    floatingLabelText='Enter task name'
                />
                <TextField
                  fullWidth
                  ref={c => this.taskInput = c}
                  value={notes}
                  onChange={this.handleNotesChange}
                  hintText='e.g. Milk 92% at 15,Food Avenue'
                  floatingLabelText='Enter task notes'
                />
                <DatePicker
                  onChange={this.handleDateChange}
                  ref='myDatePicker'
                  hintText='Portrait Dialog'
                  floatingLabelText='Enter task date due'
                  />
            </Dialog>
          </MuiThemeProvider>
        );
    }
});

export default TaskCreateModal;
