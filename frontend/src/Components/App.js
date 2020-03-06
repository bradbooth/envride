import React, { Component } from 'react';
import { connect } from "react-redux";
import { Map } from './Map/Map'
import './App.css';
import { Info } from './Information/Info';
import { Options } from './Options';

export class App extends Component {

  constructor() {
    super();
    this.state = {
     }
  }

  setOrigin = (e) => { this.setState({ origin: e.target.value })}
  setDestination = (e) => { this.setState({ destination: e.target.value })}
  // Pass loader onto the options container
  setLoader = (val) => { this.refs.options.setLoader(val) }

  getDirections = (origin, destination) => {
    if ( origin && destination ){
      this.refs.map.getDirections({
        origin,
        destination
      })
    }
  }

  render() {
    return (
      <div className="App">

        <Options
          ref="options"
          directions={this.getDirections}/>

        <Map 
          ref="map"
          loader={this.setLoader}/>

        <Info />
        
      </div>
    );
  }

}

export default connect()(App);
