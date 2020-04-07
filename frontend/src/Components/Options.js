import React, { Component } from 'react';
import { Button, Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import VehicleSelect from './Vehicle/VehicleSelect';
import './App.css';

export class Options extends Component {

  constructor() {
    super();
    this.state = {
      origin1: 'Toronto',
      origin2: 'Mississauga',
      destination: 'York University',
      loading: true
     }
  }

  setOrigin1 = (e) => { this.setState({ origin1: e.target.value })}
  setOrigin2 = (e) => { this.setState({ origin2: e.target.value })}

  setDestination = (e) => { this.setState({ destination: e.target.value })}
  
  setLoader = (val) => { this.setState({ loading: val })}

  getDirections = () => {
    this.props.directions(this.state.origin1, this.state.origin2, this.state.destination)
  }

  render() {
    return (
      <div className="OptionsContainer">

        <VehicleSelect loader={this.setLoader}/>
        <h6>Directions</h6>
        <Input
          className="options-directions-input"
          type="text"
          id="origin-1"
          placeholder="Origin 1"
          value={this.state.origin1}
          onChange={this.setOrigin1}
        />
        <Input
          className="options-directions-input"
          type="text"
          id="origin-2"
          placeholder="Origin 2"
          value={this.state.origin2}
          onChange={this.setOrigin2}
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
        disabled={ !this.state.origin1 || !this.state.origin2 || !this.state.destination }
      >
        Directions
      </Button>

        { this.state.loading && <Spinner color="success"/> }
      </div>
    );
  }

}

export default connect()(Options);
