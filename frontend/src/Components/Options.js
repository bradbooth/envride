import React, { Component } from 'react';
import { Button, Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { VehicleSelect } from './Vehicle/VehicleSelect';
import './App.css';

export class Options extends Component {

  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
      loading: true
     }
  }

  setOrigin = (e) => { this.setState({ origin: e.target.value })}
  
  setDestination = (e) => { this.setState({ destination: e.target.value })}
  
  setLoader = (val) => { this.setState({ loading: val })}

  getDirections = () => {
    this.props.directions(this.state.origin, this.state.destination)
  }

  render() {
    return (
      <div className="OptionsContainer">

        <VehicleSelect loader={this.setLoader}/>
        <h6>Directions</h6>
        <Input
          className="options-directions-input"
          type="text"
          id="origin"
          placeholder="Origin"
          value={this.state.origin}
          onChange={this.setOrigin}
        />
        <Input
          className="options-directions-input"
          type="text"
          id="destination"
          placeholder="Destination"
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
    );
  }

}

export default connect()(Options);
