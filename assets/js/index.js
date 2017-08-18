import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Layout/>
            </MuiThemeProvider>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('react-app'));