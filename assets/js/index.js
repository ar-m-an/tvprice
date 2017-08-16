import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout/Layout';


class App extends React.Component {
    render() {
        return (
            <div>
                <Layout/>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('react-app'));