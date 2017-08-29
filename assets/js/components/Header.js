import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

require('../../stylesheets/components/header.scss');


export default class Header extends React.Component {

    render() {
        return (
            <div className="header-container">

                <AppBar
                    title="TV Price"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementRight={<IconButton><ActionSearch /></IconButton>}

                />
            </div>
        );
    }
}