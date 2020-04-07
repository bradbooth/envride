import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { connect } from "react-redux";
import { updateDistance } from '../../Redux/Actions/Data'
import './Map.css'

export class Map extends Component {
  map = React.createRef();

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
        const coords = coordinates[i].split(',')
        const lat = coords[0]
        const lng = coords[1]
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

    const URL = `/api/maps/directions`

    axios.get(URL, {
      params: {
        origin1: locations.origin1,
        origin2: locations.origin2,
        destination: locations.destination,
        co2: this.props.vehicleData.co2TailpipeGpm
      }
    })
      .then( res => {
        this.props.updateDistance(res.data.distanceInMeters)
        const coordinates = res.data.coordinates
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

const mapDispatchToProps = (dispatch) => ({
  updateDistance: (distance) => dispatch(updateDistance(distance))
});

const mapStateToProps = state => ({
  vehicleData: state.data.co2
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Map);
