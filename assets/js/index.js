import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';


class App extends React.Component {
    render() {
        return (
                     <Layout/>
                );
    }
}


ReactDOM.render(<App />, document.getElementById('react-app'));