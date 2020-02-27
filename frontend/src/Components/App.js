import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from "react-redux";
import { updateTest } from "../Redux/Actions/Test"

export class App extends Component {


  componentDidMount(){
    this.props.updateTest("Sent to redux store")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Redux "test": {this.props.test}</p>
        </header>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  updateTest: (value) => dispatch(updateTest(value)),
});

const mapStateToProps = state => {
  return { 
    test: state.testStore.test
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
