import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

import { connect } from "react-redux";

export class App extends Component {

  componentDidMount(){
    console.log( 'env', process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }} className="App">
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
