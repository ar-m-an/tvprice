import React, {Component} from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from  '../MainContent/MainContent';


export default class Layout extends React.Component {

    render() {
        return (
            <div className="layout-container">
                <Header/>
                <MainContent/>
                <Sidebar/>
            </div>
        );
    }
}
