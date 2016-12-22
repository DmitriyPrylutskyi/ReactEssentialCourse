import React from 'react';

require ('./LoggedInLayout.less');

const LoggedInLayout = React.createClass({
    render() {
        return (
            <div className='LoggedInLayout'>
                <div className='LoggedInLayout__content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default LoggedInLayout;
