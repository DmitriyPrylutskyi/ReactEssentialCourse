import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const DeleteTaskModal = React.createClass({
    handleClose() {
        const { onClose } = this.props;
        if (onClose) {
            onClose();
        }
    },

    handleSubmit() {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit();
        }
    },
    render() {
        const { isOpen } = this.props;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Dialog
                    className='DeleteTaskModal'
                    contentStyle={{ maxWidth: 400 }}
                    actions={[
                        <FlatButton
                            label='Cancel'
                            onClick={this.handleClose}
                        />,
                        <FlatButton
                            primary
                            label='Submit'
                            disabled={false}
                            onClick={this.handleSubmit}
                        />
                    ]}
                    open={isOpen}
                    onRequestClose={this.handleClose}
                >
                  <h3 className='TaskCreateModal__modal-title'>Delete {this.props.subject}</h3>
                  <h4>Are you sure to delete {this.props.subject}?</h4>
                </Dialog>
            </MuiThemeProvider>
        );
    }
});

export default DeleteTaskModal;
