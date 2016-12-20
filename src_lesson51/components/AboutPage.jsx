import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

require ('./AboutPage.less');

const AboutPage = React.createClass({
    render() {
        return (
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div className='AboutPage'>
                <Paper
                    zDepth={1}
                    className='AboutPage__content'
                >
                    <h2> Google Tasks </h2>
                    <p>This application is written based on <a href='https://developers.google.com/google-apps/tasks/'>
                    Google Tasks API</a> using Material Design concepts.</p>
                    <p>It is a final result of ReactJS Essential Course.</p>
                </Paper>
            </div>
          </MuiThemeProvider>
        );
    }
});

export default AboutPage;
