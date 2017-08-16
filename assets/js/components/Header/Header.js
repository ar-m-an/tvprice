import React, {Component} from 'react';
require('./header.scss');

export default class Header extends React.Component {

    render(){
        return(
            <div className="header-container">
                <h1>This is Header</h1>
            </div>
        );
    }
}