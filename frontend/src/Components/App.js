import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './App.css';

import { Button, Input } from "reactstrap";

import { connect } from "react-redux";

export class App extends Component {
  
  static defaultProps = {

  }

  constructor() {
    super();

    this.state = {
      mapConfig: {
        center: {
          lat: 43.71,
          lng: -79.51
        },
        zoom: 11
      },
      origin: '',
      destination: ''
    };
  }

  setMap = (google) => {
    this.setState({
      google
    })
  }

  getDirections = () => {
    console.log(`/api/maps/directions?origin=${this.state.origin}&destination=${this.state.destination}`)
    axios.get(`/api/maps/directions?origin=${this.state.origin}&destination=${this.state.destination}`)
      .then( res => {
        const coordinates = res.data
        const routePolyline = new this.state.google.maps.Polyline({
          path: coordinates
        });
        routePolyline.setMap(this.state.google.map);
      })
  }

  setOrigin = (e) => { this.setState({ origin: e.target.value })}
  setDestination = (e) => { this.setState({ destination: e.target.value })}

  render() {
    return (
      <div className="App">

      <div className="OptionsContainer">
        Options and stuff will go here

        <Input 
          type="text"
          id="origin"
          placeholder="origin"
          value={this.state.origin}
          onChange={this.setOrigin}
        />

        <Input
          type="text"
          id="destination"
          placeholder="destination"
          value={this.state.destination}
          onChange={this.setDestination}
        />
        <Button onClick={ this.getDirections }>Directions</Button>


      </div>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.state.mapConfig.center}
          defaultZoom={this.state.mapConfig.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={ this.setMap }
        >
        </GoogleMapReact>
      </div>
    );
  }

}

export default connect()(App);
