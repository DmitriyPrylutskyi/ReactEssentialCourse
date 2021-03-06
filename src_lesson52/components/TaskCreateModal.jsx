import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const TaskCreateModal = React.createClass({
    getInitialState() {
        return {
            text : ''
        };
    },

    handleClose() {
        const { onClose } = this.props;

        this.setState({ text: '' });

        if (onClose) {
            onClose();
        }
    },

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                text: this.state.text
            });
        }

        this.setState({ text: '' });
    },

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    },

    render() {
        const { text } = this.state;
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
                    floatingLabelText='Enter task description'
                />
            </Dialog>
          </MuiThemeProvider>
        );
    }
});

export default TaskCreateModal;
