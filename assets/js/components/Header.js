import React, {Component} from 'react';


require('../../stylesheets/components/header.scss');


export default class Header extends React.Component {

    render() {
        return (
            <div className="header-container">
                <nav className="nav-extended">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">آخرین قیمت تلویزیون</a>

                    </div>

                </nav>


            </div>
        );
    }
}