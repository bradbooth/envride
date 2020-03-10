import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { connect } from "react-redux";
import './Map.css'

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
      polyline: null
    };
  }

  setMap = (google) => {
    this.setState({
      google
    })
  }


  animateRoute = (polyline, coordinates) => {
    for( let i=0; i<coordinates.length; i++){
      setTimeout(() => {
        const lat = coordinates[i].lat
        const lng = coordinates[i].lng
        this.state.polyline.getPath().push(new this.state.google.maps.LatLng(lat, lng))
      }, 5*i);
    }
  }

  clearRoute = () => {
    if ( this.state.polyline ){
      this.state.polyline.setMap(null)
    }
  }

  getDirections = (locations) => {
    this.props.loader(true)

    const URL = `/api/maps/directions?origin=${locations.origin}&destination=${locations.destination}`

    axios.get(URL)
      .then( res => {
        const coordinates = res.data
        const routePolyline = new this.state.google.maps.Polyline({
          path: [],
          map: this.state.google.map,
          strokeColor: '#149400',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });

        this.clearRoute()
        this.setState({
          polyline: routePolyline
        }, () => {
          this.animateRoute(routePolyline, coordinates)
        })
        this.props.loader(false)

      }).catch( err => {
        console.log("ERROR: " + err)
        this.props.loader(false)
      })
  }

  render() {

    const options ={
      gestureHandling: "greedy" // Always take scroll focus on mouse hover
    }

    return (
      <div className="map-container">

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          options={options}
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
