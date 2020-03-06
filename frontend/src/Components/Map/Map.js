import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

import { connect } from "react-redux";

export class Map extends Component {
  
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
      loading: false
    };
  }

  setMap = (google) => {
    this.setState({
      google
    })
  }

  getDirections = (locations) => {
    this.props.loader(true)

    const URL = `/api/maps/directions?origin=${locations.origin}&destination=${locations.destination}`

    axios.get(URL)
      .then( res => {
        const coordinates = res.data
        const routePolyline = new this.state.google.maps.Polyline({
          path: coordinates,
          strokeColor: '#149400',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        routePolyline.setMap(this.state.google.map);
        this.props.loader(false)

      }).catch( err => {
        console.log("ERROR: " + err)
        this.props.loader(false)
      })
  }

  setOrigin = (e) => { this.setState({ origin: e.target.value })}
  setDestination = (e) => { this.setState({ destination: e.target.value })}

  render() {
    return (
      <div className="App">

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

export default connect()(Map);
