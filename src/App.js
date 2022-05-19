import React from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from 'react-modal';
import HomePage from './HomePage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
        };
    }

    componentDidMount() {
        console.log(React.version);
    }

    render() {
        return (
            <div className='App'>
                <HomePage />
            </div>
        );
    }
}

export default App;
