import React, { Component } from 'react';
import { Button, Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { VehicleSelect } from './Vehicle/VehicleSelect';
import { Map } from './Map/Map'
import './App.css';

export class App extends Component {
  
  static defaultProps = {

  }

  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
      loading: false
     }
  }

  setOrigin = (e) => { this.setState({ origin: e.target.value })}
  setDestination = (e) => { this.setState({ destination: e.target.value })}
  setLoader = (val) => { this.setState({ loading: val })}

  getDirections = () => {
    if ( this.state.origin && this.state.destination ){
      this.refs.map.getDirections({
        origin: this.state.origin,
        destination: this.state.destination
      })
    }
  }

  render() {
    return (
      <div className="App">

      <div className="OptionsContainer">

        <VehicleSelect/>
        <h6>Directions</h6>
        <Input
          className="options-directions-input"
          type="text"
          id="origin"
          placeholder="origin"
          value={this.state.origin}
          onChange={this.setOrigin}
        />

        <Input
          className="options-directions-input"
          type="text"
          id="destination"
          placeholder="destination"
          value={this.state.destination}
          onChange={this.setDestination}
        />

      <Button
        className="options-directions-button"
        onClick={ this.getDirections }
        disabled={ !this.state.origin || !this.state.destination }
      >
        Directions
      </Button>

        { this.state.loading && <Spinner color="success"/> }
      </div>

        <Map 
          ref="map"
          loader={this.setLoader}/>
      </div>
    );
  }

}

export default connect()(App);
