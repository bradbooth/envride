import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

import { connect } from "react-redux";

export class App extends Component {
  
  static defaultProps = {
    center: {
      lat: 43.71,
      lng: -79.51
    },
    zoom: 11
  }

  componentDidMount(){
    console.log(process.env)
  }

  render() {
    return (
      <div className="App">

      <div className="OptionsContainer">
        Options container
      </div>

       <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }

}

export default connect()(App);
